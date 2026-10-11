import type { QueryClient } from '@tanstack/react-query'


const PRIVATE_ROOTS = ['auth', 'cart', 'orders', 'favorites', 'profile', 'wallets']

export function clearPrivateCache(queryClient: QueryClient) {
  queryClient.removeQueries({
    predicate: (query) => PRIVATE_ROOTS.includes(String(query.queryKey[0])),
  })
}