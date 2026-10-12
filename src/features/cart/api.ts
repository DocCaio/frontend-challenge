import { http } from '@/lib/http'
import type { Cart, NftListParams } from './types'
import type { NftListResponse } from './hooks'


export async function fetchNfts(params: NftListParams, signal?: AbortSignal): Promise<NftListResponse> {
  const { data } = await http.get<NftListResponse>('/nfts', {
    params,
    signal,
  })
  return data
}


export async function fetchCart(signal?: AbortSignal): Promise<Cart> {
  const { data } = await http.get<Cart>('/cart', { signal })
  return data
}

export async function addCartItem(input: { nftId: string; quantity: number }): Promise<Cart> {
  const { data } = await http.post<Cart>('/cart/items', input)
  return data
}

export async function updateCartItem(input: { nftId: string; quantity: number }): Promise<Cart> {
  const { data } = await http.patch<Cart>(`/cart/items/${encodeURIComponent(input.nftId)}`, {
    quantity: input.quantity,
  })
  return data
}

export async function removeCartItem(nftId: string): Promise<Cart> {
  const { data } = await http.delete<Cart>(`/cart/items/${encodeURIComponent(nftId)}`)
  return data
}

export async function applyCoupon(code: string): Promise<Cart> {
  const { data } = await http.post<Cart>('/cart/coupon', { code })
  return data
}

export async function removeCoupon(): Promise<Cart> {
  const { data } = await http.delete<Cart>('/cart/coupon')
  return data
}