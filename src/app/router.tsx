import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { z } from 'zod'
import RootLayout from '@/app/layout/RootLayout'
import CartPage from '@/pages/cart/CartPage'
import HomePage from '@/pages/HomePage'

const searchSchema = z.object({
  q: z.string().optional(),
  collection: z.string().optional(),
  network: z.enum(['Ethereum', 'Polygon', 'Solana']).optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  sort: z.enum(['recent', 'price_asc', 'price_desc']).default('recent'),
  page: z.coerce.number().int().min(1).default(1),
})

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <p className="page-container py-10">Página não encontrada.</p>,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: searchSchema,
  component: HomePage,
})

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/carrinho',
  component: CartPage,
})

const routeTree = rootRoute.addChildren([indexRoute, cartRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}