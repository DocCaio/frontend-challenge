import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { z } from 'zod'
import RootLayout from '@/components/RootLayout'
import HomePage from '@/features/catalog/HomePage'

// filtros vivem na URL (sobrevivem a refresh e histórico)
const searchSchema = z.object({
  q: z.string().optional().catch(undefined),
  collection: z.string().optional().catch(undefined),
  network: z.enum(['Ethereum', 'Polygon', 'Solana']).optional().catch(undefined),
  minPrice: z.string().optional().catch(undefined),
  maxPrice: z.string().optional().catch(undefined),
  sort: z.enum(['recent', 'price_asc', 'price_desc']).catch('recent'),
  page: z.coerce.number().int().min(1).catch(1),
})

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <p className="p-10">Página não encontrada.</p>,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: searchSchema,
  component: HomePage,
})

const routeTree = rootRoute.addChildren([indexRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}