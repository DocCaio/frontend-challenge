import { delay, http, HttpResponse } from 'msw'
import Decimal from 'decimal.js'
import { db, type CartState } from '../db'
import { coupons } from '../fixtures/coupons'
import type { Cart, CartItem } from '@/features/cart/types'

const NETWORK_FEE = '0.016' 

type Json = Record<string, unknown>

async function readBody(request: Request): Promise<Json> {
  try {
    return (await request.json()) as Json
  } catch {
    return {}
  }
}

const fail = (status: number, code: string, message: string, extra: Json = {}) =>
  HttpResponse.json({ code, message, ...extra }, { status })

const noVisitor = () =>
  fail(400, 'VISITOR_REQUIRED', 'Identificador de visitante ausente.')

const isPositiveInt = (v: unknown): v is number =>
  typeof v === 'number' && Number.isInteger(v) && v >= 1

const ownerOf = (request: Request) => request.headers.get('X-Visitor-Id')

function getState(owner: string): CartState {
  return (db.carts[owner] ??= { lines: [], couponCode: null, version: 0 })
}

function commit(state: CartState) {
  state.version += 1
  db.saveCarts()
}


function buildCart(state: CartState): Cart {
  const items: CartItem[] = []

  for (const line of state.lines) {
    const nft = db.nfts.find((n) => n.id === line.nftId)
    if (!nft) continue
    items.push({
      nftId: nft.id,
      name: nft.name,
      edition: nft.edition,
      tokenId: `#${nft.edition.padStart(4, '0')}`,
      imageUrl: nft.imageUrl,
      unitPrice: nft.price,
      lineTotal: new Decimal(nft.price).times(line.quantity).toFixed(),
      quantity: line.quantity,
      available: nft.available,
    })
  }

  const subtotal = items.reduce((acc, i) => acc.plus(i.lineTotal), new Decimal(0))
  const coupon = coupons.find((c) => c.code === state.couponCode) ?? null

  let discount = new Decimal(0)
  if (coupon && items.length > 0) {
    discount =
      coupon.kind === 'percent'
        ? subtotal.times(coupon.value).div(100)
        : Decimal.min(coupon.value, subtotal)
  }
  discount = discount.toDecimalPlaces(6)

  const fee = items.length > 0 ? new Decimal(NETWORK_FEE) : new Decimal(0)
  const total = subtotal.minus(discount).plus(fee)

  return {
    items,
    itemCount: items.reduce((n, i) => n + i.quantity, 0),
    version: state.version,
    quote: {
      currency: 'ETH',
      subtotal: subtotal.toFixed(),
      discount: discount.toFixed(),
      networkFee: fee.toFixed(),
      total: total.toFixed(),
      coupon: coupon ? { code: coupon.code, description: coupon.description } : null,
    },
  }
}

export const cartHandlers = [
  http.get('/api/cart', async ({ request }) => {
    const owner = ownerOf(request)
    if (!owner) return noVisitor()
    await delay(250)
    return HttpResponse.json(buildCart(getState(owner)))
  }),

  http.post('/api/cart/items', async ({ request }) => {
    const owner = ownerOf(request)
    if (!owner) return noVisitor()
    const body = await readBody(request)
    await delay(250)

    const nftId = typeof body.nftId === 'string' ? body.nftId : ''
    const quantity = body.quantity
    if (!nftId || !isPositiveInt(quantity)) {
      return fail(422, 'VALIDATION_ERROR', 'Informe um NFT e uma quantidade inteira maior que zero.')
    }

    const nft = db.nfts.find((n) => n.id === nftId)
    if (!nft) return fail(404, 'NFT_NOT_FOUND', 'NFT não encontrado.')

    const state = getState(owner)
    const line = state.lines.find((l) => l.nftId === nftId)
    const inCart = line?.quantity ?? 0

    if (inCart + quantity > nft.available) {
      const left = Math.max(nft.available - inCart, 0)
      return fail(
        409,
        'INSUFFICIENT_AVAILABILITY',
        left === 0
          ? 'Você já tem todas as edições disponíveis desse NFT no carrinho.'
          : `Só há ${left} ${left === 1 ? 'edição disponível' : 'edições disponíveis'} para adicionar.`,
        { available: nft.available },
      )
    }

    if (line) line.quantity = inCart + quantity
    else state.lines.push({ nftId, quantity })

    commit(state)
    return HttpResponse.json(buildCart(state))
  }),

  http.patch('/api/cart/items/:nftId', async ({ request, params }) => {
    const owner = ownerOf(request)
    if (!owner) return noVisitor()
    const body = await readBody(request)
    await delay(250)

    const quantity = body.quantity
    if (!isPositiveInt(quantity)) {
      return fail(422, 'VALIDATION_ERROR', 'A quantidade deve ser um número inteiro maior que zero.')
    }

    const state = getState(owner)
    const line = state.lines.find((l) => l.nftId === String(params.nftId))
    if (!line) return fail(404, 'CART_ITEM_NOT_FOUND', 'Esse item não está no carrinho.')

    const nft = db.nfts.find((n) => n.id === line.nftId)
    if (!nft) return fail(404, 'NFT_NOT_FOUND', 'NFT não encontrado.')

    if (quantity > nft.available) {
      return fail(
        409,
        'INSUFFICIENT_AVAILABILITY',
        `Só há ${nft.available} ${nft.available === 1 ? 'edição disponível' : 'edições disponíveis'} desse NFT.`,
        { available: nft.available },
      )
    }

    line.quantity = quantity
    commit(state)
    return HttpResponse.json(buildCart(state))
  }),

  http.delete('/api/cart/items/:nftId', async ({ request, params }) => {
    const owner = ownerOf(request)
    if (!owner) return noVisitor()
    await delay(250)

    const state = getState(owner)
    state.lines = state.lines.filter((l) => l.nftId !== String(params.nftId))
    if (state.lines.length === 0) state.couponCode = null // carrinho vazio perde o cupom

    commit(state)
    return HttpResponse.json(buildCart(state))
  }),

  http.post('/api/cart/coupon', async ({ request }) => {
    const owner = ownerOf(request)
    if (!owner) return noVisitor()
    const body = await readBody(request)
    await delay(300)

    const code = typeof body.code === 'string' ? body.code.trim().toUpperCase() : ''
    if (!code) return fail(422, 'VALIDATION_ERROR', 'Digite um código promocional.')

    const state = getState(owner)
    if (state.lines.length === 0) {
      return fail(409, 'CART_EMPTY', 'Adicione itens ao carrinho antes de aplicar um cupom.')
    }

    const coupon = coupons.find((c) => c.code === code)
    if (!coupon) {
      return fail(422, 'COUPON_INVALID', 'Cupom inválido. Confira o código e tente de novo.')
    }
    if (coupon.expiresAt && Date.parse(coupon.expiresAt) < Date.now()) {
      return fail(422, 'COUPON_EXPIRED', 'Este cupom expirou.')
    }

    state.couponCode = coupon.code
    commit(state)
    return HttpResponse.json(buildCart(state))
  }),

  http.delete('/api/cart/coupon', async ({ request }) => {
    const owner = ownerOf(request)
    if (!owner) return noVisitor()
    await delay(250)

    const state = getState(owner)
    state.couponCode = null
    commit(state)
    return HttpResponse.json(buildCart(state))
  }),
]