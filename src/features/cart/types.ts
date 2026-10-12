export interface CartItem {
  nftId: string
  name: string
  edition: string
  tokenId: string 
  imageUrl: string
  unitPrice: string 
  lineTotal: string 
  quantity: number 
  available: number 
}

export interface CartCoupon {
  code: string
  description: string
}

export interface Quote {
  currency: 'ETH'
  subtotal: string
  discount: string
  networkFee: string
  total: string
  coupon: CartCoupon | null
}

export interface Cart {
  items: CartItem[]
  itemCount: number 
  version: number
  quote: Quote
}

export interface Nft {
  id: string
  name: string
  edition: string
  imageUrl: string
  price: string
  originalPrice?: string
  badge?: 'new' | string
}

export interface NftListParams {
  page?: number
  limit?: number
  category?: string
  search?: string
}