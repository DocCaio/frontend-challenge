import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Decimal from 'decimal.js'
import { getStoredSession, useStoredSession } from '@/lib/session'
import { getVisitorId } from '@/lib/visitor'
import {
  addCartItem,
  applyCoupon,
  fetchCart,
  removeCartItem,
  removeCoupon,
  updateCartItem,
} from './api'
import type { Cart } from './types'


export const cartKeys = {
  all: ['cart'] as const,
  detail: (owner: string) => [...cartKeys.all, owner] as const,
}

const currentOwner = () => getStoredSession()?.userId ?? getVisitorId()
const currentCartKey = () => cartKeys.detail(currentOwner())

const cartScope = { id: 'cart' }


function useCartKey() {
  const session = useStoredSession()
  return cartKeys.detail(session?.userId ?? getVisitorId())
}

export function useCart() {
  return useQuery({
    queryKey: useCartKey(),
    queryFn: ({ signal }) => fetchCart(signal),
    staleTime: 15_000,
  })
}


export function useCartCount() {
  const { data } = useQuery({
    queryKey: useCartKey(),
    queryFn: ({ signal }) => fetchCart(signal),
    staleTime: 15_000,
    select: (cart) => cart.itemCount,
  })
  return data ?? 0
}

export function useAddToCart() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: addCartItem,
    scope: cartScope,
    onSuccess: (cart) => qc.setQueryData(currentCartKey(), cart),
  })
}


export function useUpdateCartItem() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: updateCartItem,
    scope: cartScope,
    onMutate: async ({ nftId, quantity }) => {
      const key = currentCartKey()
      await qc.cancelQueries({ queryKey: key })
      const previous = qc.getQueryData<Cart>(key)

      if (previous) {
        const items = previous.items.map((item) =>
          item.nftId === nftId
            ? {
                ...item,
                quantity,
                lineTotal: new Decimal(item.unitPrice).times(quantity).toFixed(),
              }
            : item,
        )
        qc.setQueryData<Cart>(key, {
          ...previous,
          items,
          itemCount: items.reduce((acc, it) => acc + it.quantity, 0),
        })
      }
      return { previous }
    },
    onError: (_error, _vars, context) => {
      const key = currentCartKey()
      if (context?.previous) qc.setQueryData(key, context.previous)
      qc.invalidateQueries({ queryKey: key })
    },

    onSuccess: (cart) => qc.setQueryData(currentCartKey(), cart),
  })
}

export function useRemoveCartItem() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: removeCartItem,
    scope: cartScope,
    onSuccess: (cart) => qc.setQueryData(currentCartKey(), cart),
  })
}

export function useApplyCoupon() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: applyCoupon,
    scope: cartScope,
    onSuccess: (cart) => qc.setQueryData(currentCartKey(), cart),
  })
}

export function useRemoveCoupon() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: removeCoupon,
    scope: cartScope,
    onSuccess: (cart) => qc.setQueryData(currentCartKey(), cart),
  })
}