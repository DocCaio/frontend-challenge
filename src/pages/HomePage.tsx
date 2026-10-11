import { useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import AddToCartButton from '@/features/cart/components/AddToCartButton'
import FeaturedNft from '@/features/catalog/components/FeaturedNft'
import FiltersAside from '@/features/catalog/components/FiltersAside'
import NftGrid from '@/features/catalog/components/NftGrid'
import JournalSection from '@/features/journal/components/JournalSection'
import Hero from './Hero'
import PromoCards from './PromoCards'

const route = getRouteApi('/')

export default function HomePage() {
  const search = route.useSearch()
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <>
      <Hero />

      <section
        id="explorar"
        className="page-container grid items-start gap-6 pb-12 md:grid-cols-[240px_1fr] xl:grid-cols-[310px_1fr] xl:gap-12"
      >
        <div>
     
          <button
            type="button"
            aria-expanded={filtersOpen}
            aria-controls="filtros"
            onClick={() => setFiltersOpen((o) => !o)}
            className="mb-4 w-full cursor-pointer rounded-lg bg-kurio-accent px-4 py-2 font-medium text-kurio-bg md:hidden"
          >
            {filtersOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
          </button>

          <div id="filtros" className={`${filtersOpen ? 'block' : 'hidden'} space-y-6 md:block`}>
            <FiltersAside />
            <FeaturedNft />
          </div>
        </div>

  
        <NftGrid
          params={search}
          renderAction={(nft) => <AddToCartButton nftId={nft.id} className="w-full" />}
        />
      </section>

      <PromoCards />
      <JournalSection />
    </>
  )
}