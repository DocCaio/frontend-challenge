import { delay, http, HttpResponse } from 'msw'
import Decimal from 'decimal.js'
import { collections, db, networks } from '../db'
import type { Network, Nft, NftSort } from '@/features/catalog/types'

const PAGE_SIZE = 9

function countBy(pick: (n: Nft) => string) {
  const map = new Map<string, number>()
  for (const nft of db.nfts) {
    const key = pick(nft)
    map.set(key, (map.get(key) ?? 0) + 1)
  }
  return map
}

export const catalogHandlers = [
  
  http.get('/api/nfts/facets', async () => {
    await delay(200)

    const byCollection = countBy((n) => n.collection)
    const byNetwork = countBy((n) => n.network)
    const prices = db.nfts.map((n) => n.price)

    return HttpResponse.json({
      collections: collections.map((name) => ({ name, count: byCollection.get(name) ?? 0 })),
      networks: networks.map((name) => ({ name, count: byNetwork.get(name) ?? 0 })),
      priceRange: {
        min: Decimal.min(...prices).toFixed(2),
        max: Decimal.max(...prices).toFixed(2),
      },
    })
  }),

  http.get('/api/nfts/featured', async () => {
    await delay(200)
    const featured = db.nfts.find((n) => n.id === db.featuredId)
    if (!featured) return HttpResponse.json({ message: 'Destaque não encontrado' }, { status: 404 })
    return HttpResponse.json(featured)
  }),

  http.get('/api/nfts', async ({ request }) => {
    const url = new URL(request.url)
    const q = url.searchParams.get('q')?.toLowerCase()
    const collection = url.searchParams.get('collection')
    const network = url.searchParams.get('network') as Network | null
    const minPrice = url.searchParams.get('minPrice')
    const maxPrice = url.searchParams.get('maxPrice')
    const sort = (url.searchParams.get('sort') ?? 'recent') as NftSort
    const page = Math.max(1, Number(url.searchParams.get('page') ?? 1))

    await delay(400)

    let items = db.nfts.filter((n) => {
      if (q && !`${n.name} ${n.edition}`.toLowerCase().includes(q)) return false
      if (collection && n.collection !== collection) return false
      if (network && n.network !== network) return false
      if (minPrice && new Decimal(n.price).lt(minPrice)) return false
      if (maxPrice && new Decimal(n.price).gt(maxPrice)) return false
      return true
    })

    if (sort === 'price_asc')
      items = [...items].sort((a, b) => new Decimal(a.price).comparedTo(b.price))
    if (sort === 'price_desc')
      items = [...items].sort((a, b) => new Decimal(b.price).comparedTo(a.price))

    const total = items.length
    const start = (page - 1) * PAGE_SIZE

    return HttpResponse.json({
      items: items.slice(start, start + PAGE_SIZE),
      page,
      pageSize: PAGE_SIZE,
      total,
      totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    })
  }),
]