import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Decimal from 'decimal.js'
import { getVisitorId } from '@/lib/visitor'
import {
  fetchNfts,
  fetchCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  applyCoupon,
  removeCoupon,
} from './api'
import type { Cart, Nft, NftListParams } from './types'


export interface NftListResponse {
  items: Nft[]
  total: number
}

export function useNfts(params: NftListParams) {
  return useQuery<NftListResponse>({
    queryKey: ['nfts', params],
    queryFn: ({ signal }) => fetchNfts(params, signal),
    staleTime: 30_000,
  })
}


export const cartKeys = {
  all: ['cart'] as const,
  detail: (owner: string) => [...cartKeys.all, owner] as const,
}

const currentCartKey = () => cartKeys.detail(getVisitorId())
const cartScope = { id: 'cart' }

export function useCart() {
  return useQuery({
    queryKey: currentCartKey(),
    queryFn: ({ signal }) => fetchCart(signal),
    staleTime: 15_000,
  })
}

export function useCartCount() {
  const { data } = useQuery({
    queryKey: currentCartKey(),
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
        qc.setQueryData<Cart>(key, {
          ...previous,
          items: previous.items.map((item) =>
            item.nftId === nftId
              ? {
                  ...item,
                  quantity,
                  lineTotal: new Decimal(item.unitPrice).times(quantity).toFixed(),
                }
              : item,
          ),
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