import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchFacets, fetchFeaturedNft, fetchNfts } from './api'
import type { NftListParams } from './types'

export const nftKeys = {
  all: ['nfts'] as const,
  list: (params: NftListParams) => [...nftKeys.all, 'list', params] as const,
  facets: () => [...nftKeys.all, 'facets'] as const,
  featured: () => [...nftKeys.all, 'featured'] as const,
}

export function useNfts(params: NftListParams) {
  return useQuery({
    queryKey: nftKeys.list(params),
  
    queryFn: ({ signal }) => fetchNfts(params, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
}

export function useFacets() {
  return useQuery({
    queryKey: nftKeys.facets(),
    queryFn: ({ signal }) => fetchFacets(signal),
    staleTime: 5 * 60_000,
  })
}

export function useFeaturedNft() {
  return useQuery({
    queryKey: nftKeys.featured(),
    queryFn: ({ signal }) => fetchFeaturedNft(signal),
    staleTime: 60_000,
  })
}