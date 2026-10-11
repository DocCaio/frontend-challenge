import { http } from '@/lib/http'
import type { Cart } from './types'

export async function fetchCart(signal?: AbortSignal): Promise<Cart> {
  const { data } = await http.get<Cart>('/cart', { signal })
  return data
}


const inflightAdds = new Map<string, Promise<Cart>>()

export async function addCartItem(input: { nftId: string; quantity: number }): Promise<Cart> {
  const { nftId, quantity } = input

  if (!nftId) throw new Error('addCartItem: nftId é obrigatório')
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error('addCartItem: quantity deve ser um inteiro > 0')
  }

  const key = `${nftId}:${quantity}`
  const existing = inflightAdds.get(key)
  if (existing) return existing

  const promise = http
    .post<Cart>('/cart/items', { nftId, quantity })
    .then((res) => res.data)
    .finally(() => {
      inflightAdds.delete(key)
    })

  inflightAdds.set(key, promise)
  return promise
}

export async function updateCartItem(input: { nftId: string; quantity: number }): Promise<Cart> {
  if (!input.nftId) throw new Error('updateCartItem: nftId é obrigatório')
  if (!Number.isInteger(input.quantity) || input.quantity <= 0) {
    throw new Error('updateCartItem: quantity deve ser um inteiro > 0')
  }

  const { data } = await http.patch<Cart>(`/cart/items/${encodeURIComponent(input.nftId)}`, {
    quantity: input.quantity,
  })
  return data
}

export async function removeCartItem(nftId: string): Promise<Cart> {
  if (!nftId) throw new Error('removeCartItem: nftId é obrigatório')

  const { data } = await http.delete<Cart>(`/cart/items/${encodeURIComponent(nftId)}`)
  return data
}

export async function applyCoupon(code: string): Promise<Cart> {
  if (!code.trim()) throw new Error('applyCoupon: code é obrigatório')

  const { data } = await http.post<Cart>('/cart/coupon', { code })
  return data
}

export async function removeCoupon(): Promise<Cart> {
  const { data } = await http.delete<Cart>('/cart/coupon')
  return data
}