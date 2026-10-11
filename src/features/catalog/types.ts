export type Network = 'Ethereum' | 'Polygon' | 'Solana'

export type NftSort = 'recent' | 'price_asc' | 'price_desc'

export interface Nft {
  id: string
  name: string
  imageUrl: string
  price: string
  originalPrice?: string
  currency: 'ETH'
  collection: string
  network: Network
  available: number
  edition: number | string
  badge?: 'new'
}

export interface NftListParams {
  q?: string
  collection?: string
  network?: Network
  minPrice?: string
  maxPrice?: string
  sort: NftSort
  page: number
}

export interface Paginated<T> {
  items: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface FacetCount<T extends string = string> {
  name: T
  count: number
}

export interface Facets {
  collections: FacetCount[]
  networks: FacetCount<Network>[]
  priceRange: { min: string; max: string }
}