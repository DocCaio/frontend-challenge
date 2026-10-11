import { http } from '@/lib/http'
import type { Facets, Nft, NftListParams, Paginated } from './types'

export async function fetchNfts(
  params: NftListParams,
  signal?: AbortSignal,
): Promise<Paginated<Nft>> {
  const { data } = await http.get<Paginated<Nft>>('/nfts', { params, signal })
  return data
}

export async function fetchFacets(signal?: AbortSignal): Promise<Facets> {
  const { data } = await http.get<Facets>('/nfts/facets', { signal })
  return data
}

export async function fetchFeaturedNft(signal?: AbortSignal): Promise<Nft> {
  const { data } = await http.get<Nft>('/nfts/featured', { signal })
  return data
}