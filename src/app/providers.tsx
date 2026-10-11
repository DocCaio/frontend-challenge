import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, type ReactNode } from 'react'
import { clearPrivateCache } from '@/lib/privateCache'
import { onSessionEnded } from '@/lib/session'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, refetchOnWindowFocus: false },
  },
})

export function Providers({ children }: { children: ReactNode }) {

  useEffect(() => onSessionEnded(() => clearPrivateCache(queryClient)), [])

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}