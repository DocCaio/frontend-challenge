import { delay, http, HttpResponse } from 'msw'
import Decimal from 'decimal.js'
import { identify } from '../auth'
import { commitCart, getCartState } from '../cartState'
import { db, type CartState } from '../db'
import { coupons } from '../fixtures/coupons'
import { fail, readBody } from '../utils'
import type { Cart, CartItem } from '@/features/cart/types'

const NETWORK_FEE = '0.016'

const isPositiveInt = (v: unknown): v is number =>
  typeof v === 'number' && Number.isInteger(v) && v >= 1

function buildCart(state: CartState): Cart {
  const items: CartItem[] = []

  for (const line of state.lines) {
    const nft = db.nfts.find((n) => n.id === line.nftId)
    if (!nft) continue

    const edition = String(nft.edition)

    items.push({
      nftId: nft.id,
      name: nft.name,
      edition,
      tokenId: `#${edition.padStart(4, '0')}`,
      imageUrl: nft.imageUrl,
      unitPrice: nft.price,
      lineTotal: new Decimal(nft.price)
        .times(line.quantity)
        .toFixed(),
      quantity: line.quantity,
      available: nft.available,
    })
  }

  const subtotal = items.reduce(
    (acc, item) => acc.plus(item.lineTotal),
    new Decimal(0),
  )

  const coupon =
    coupons.find((c) => c.code === state.couponCode) ?? null

  let discount = new Decimal(0)

  if (coupon && items.length > 0) {
    discount =
      coupon.kind === 'percent'
        ? subtotal.times(coupon.value).div(100)
        : Decimal.min(coupon.value, subtotal)
  }

  discount = discount.toDecimalPlaces(6)

  const fee =
    items.length > 0
      ? new Decimal(NETWORK_FEE)
      : new Decimal(0)

  const total = subtotal.minus(discount).plus(fee)

  return {
    items,
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
    version: state.version,
    quote: {
      currency: 'ETH',
      subtotal: subtotal.toFixed(),
      discount: discount.toFixed(),
      networkFee: fee.toFixed(),
      total: total.toFixed(),
      coupon: coupon
        ? {
            code: coupon.code,
            description: coupon.description,
          }
        : null,
    },
  }
}

export const cartHandlers = [

  http.get('/api/cart', async ({ request }) => {
    const who = identify(request)
    if (!who.ok) return who.response

    await delay(250)

    return HttpResponse.json(buildCart(getCartState(who.owner)))
  }),


  http.post('/api/cart/items', async ({ request }) => {
    const who = identify(request)
    if (!who.ok) return who.response

    const body = await readBody(request)

    await delay(250)

    const nftId =
      typeof body.nftId === 'string' ? body.nftId : ''

    const quantity = body.quantity

    if (!nftId || !isPositiveInt(quantity)) {
      return fail(
        422,
        'VALIDATION_ERROR',
        'Informe um NFT e uma quantidade inteira maior que zero.',
      )
    }

    const nft = db.nfts.find((n) => n.id === nftId)

    if (!nft) {
      return fail(404, 'NFT_NOT_FOUND', 'NFT não encontrado.')
    }

    const state = getCartState(who.owner)

    const line = state.lines.find((l) => l.nftId === nftId)
    const inCart = line?.quantity ?? 0

    if (inCart + quantity > nft.available) {
      const left = Math.max(nft.available - inCart, 0)

      return fail(
        409,
        'INSUFFICIENT_AVAILABILITY',
        left === 0
          ? 'Você já tem todas as edições disponíveis desse NFT no carrinho.'
          : `Só há ${left} ${
              left === 1
                ? 'edição disponível'
                : 'edições disponíveis'
            } para adicionar.`,
        { available: nft.available },
      )
    }

    if (line) {
      line.quantity = inCart + quantity
    } else {
      state.lines.push({ nftId, quantity })
    }

    commitCart(state)

    return HttpResponse.json(buildCart(state))
  }),


  http.patch('/api/cart/items/:nftId', async ({ request, params }) => {
    const who = identify(request)
    if (!who.ok) return who.response

    const body = await readBody(request)

    await delay(250)

    const quantity = body.quantity

    if (!isPositiveInt(quantity)) {
      return fail(
        422,
        'VALIDATION_ERROR',
        'A quantidade deve ser um número inteiro maior que zero.',
      )
    }

    const state = getCartState(who.owner)

    const line = state.lines.find(
      (l) => l.nftId === String(params.nftId),
    )

    if (!line) {
      return fail(
        404,
        'CART_ITEM_NOT_FOUND',
        'Esse item não está no carrinho.',
      )
    }

    const nft = db.nfts.find((n) => n.id === line.nftId)

    if (!nft) {
      return fail(404, 'NFT_NOT_FOUND', 'NFT não encontrado.')
    }

    if (quantity > nft.available) {
      return fail(
        409,
        'INSUFFICIENT_AVAILABILITY',
        `Só há ${nft.available} ${
          nft.available === 1
            ? 'edição disponível'
            : 'edições disponíveis'
        } desse NFT.`,
        { available: nft.available },
      )
    }

    line.quantity = quantity

    commitCart(state)

    return HttpResponse.json(buildCart(state))
  }),

 
  http.delete('/api/cart/items/:nftId', async ({ request, params }) => {
    const who = identify(request)
    if (!who.ok) return who.response

    await delay(250)

    const state = getCartState(who.owner)

    state.lines = state.lines.filter(
      (l) => l.nftId !== String(params.nftId),
    )

   
    if (state.lines.length === 0) {
      state.couponCode = null
    }

    commitCart(state)

    return HttpResponse.json(buildCart(state))
  }),


  http.post('/api/cart/coupon', async ({ request }) => {
    const who = identify(request)
    if (!who.ok) return who.response

    const body = await readBody(request)

    await delay(300)

    const code =
      typeof body.code === 'string'
        ? body.code.trim().toUpperCase()
        : ''

    if (!code) {
      return fail(
        422,
        'VALIDATION_ERROR',
        'Digite um código promocional.',
      )
    }

    const state = getCartState(who.owner)

    if (state.lines.length === 0) {
      return fail(
        409,
        'CART_EMPTY',
        'Adicione itens ao carrinho antes de aplicar um cupom.',
      )
    }

    const coupon = coupons.find((c) => c.code === code)

    if (!coupon) {
      return fail(
        422,
        'COUPON_INVALID',
        'Cupom inválido. Confira o código e tente de novo.',
      )
    }

    if (
      coupon.expiresAt &&
      Date.parse(coupon.expiresAt) < Date.now()
    ) {
      return fail(
        422,
        'COUPON_EXPIRED',
        'Este cupom expirou.',
      )
    }

    state.couponCode = coupon.code

    commitCart(state)

    return HttpResponse.json(buildCart(state))
  }),


  http.delete('/api/cart/coupon', async ({ request }) => {
    const who = identify(request)
    if (!who.ok) return who.response

    await delay(250)

    const state = getCartState(who.owner)

    state.couponCode = null

    commitCart(state)

    return HttpResponse.json(buildCart(state))
  }),
]