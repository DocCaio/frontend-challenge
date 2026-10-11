import { getRouteApi } from '@tanstack/react-router'
import { useFacets } from '../hooks'
import type { Network, NftListParams } from '../types'
import PriceFilter from './PriceFilter'

const route = getRouteApi('/')

const itemClass =
  'flex w-full cursor-pointer items-center justify-between rounded px-2 py-1.5 text-left text-sm transition-colors hover:text-kurio-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kurio-cream'

const Skeleton = () => (
  <div className="space-y-3" aria-hidden="true">
    {Array.from({ length: 8 }, (_, i) => (
      <div
        key={i}
        className="h-5 animate-pulse rounded bg-kurio-bg/60 motion-reduce:animate-none"
      />
    ))}
  </div>
)

export default function FiltersAside() {
  const search = route.useSearch() as NftListParams
  const navigate = route.useNavigate()
  const { data: facets, isPending, isError, refetch } = useFacets()

const toggleCollection = (name: string) =>
    navigate({
      search: (prev: NftListParams) => ({
        ...prev,
        collection: prev.collection === name ? undefined : name,
        page: 1,
      }),
    })

  const toggleNetwork = (name: Network) =>
    navigate({
      search: (prev: NftListParams) => ({
        ...prev,
        network: prev.network === name ? undefined : name,
        page: 1,
      }),
    })

  return (
    <aside aria-label="Filtros do catálogo" className="rounded-xl bg-kurio-surface p-5">
      {isPending && <Skeleton />}

      {isError && (
        <div role="alert" className="text-sm text-kurio-sand">
          <p>Não foi possível carregar os filtros.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-2 rounded-lg bg-kurio-accent px-3 py-1 font-bold text-kurio-bg"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {facets && (
        <div className="space-y-6">
          <section aria-labelledby="filtro-colecoes">
            <h2 id="filtro-colecoes" className="mb-2 font-bold text-kurio-cream">
              Coleções
            </h2>
            <ul>
              {facets.collections.map(({ name, count }) => {
                const selected = search.collection === name
                return (
                  <li key={name}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleCollection(name)}
                      className={`${itemClass} ${selected ? 'text-kurio-accent' : 'text-kurio-sand'}`}
                    >
                      <span>{name}</span>
                      <span className="font-bold text-kurio-cream">({count})</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>

          <section aria-labelledby="filtro-preco">
            <h2 id="filtro-preco" className="mb-3 font-bold text-kurio-cream">
              Faixa de preço
            </h2>
            <PriceFilter
              key={`${search.minPrice ?? ''}-${search.maxPrice ?? ''}`}
              bounds={facets.priceRange}
            />
          </section>

          <section aria-labelledby="filtro-rede">
            <h2 id="filtro-rede" className="mb-2 font-bold text-kurio-cream">
              Rede
            </h2>
            <ul>
              {facets.networks.map(({ name, count }) => {
                const selected = search.network === name
                return (
                  <li key={name}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleNetwork(name)}
                      className={`${itemClass} ${selected ? 'text-kurio-accent' : 'text-kurio-sand'}`}
                    >
                      <span>{name}</span>
                      <span>({count})</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      )}
    </aside>
  )
}