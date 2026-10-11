import { useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import Hero from '@/components/Hero'
import JournalSection from '@/components/JournalSection'
import FeaturedNft from '../../components/FeaturedNft'
import FiltersAside from  '../../components/FiltersAside'
import NftGrid from  '../../components/NftGrid'
import PromoCards from '../../components/PromoCards'

const route = getRouteApi('/')

export default function HomePage() {
  const search = route.useSearch()
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <>
      <Hero />

  
      <section
        id="explorar"
        className="mx-auto grid max-w-7xl items-start gap-6 px-4 pb-12 md:grid-cols-[240px_1fr] md:px-10 xl:grid-cols-[310px_1fr] xl:gap-12"
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

        <NftGrid params={search} />
      </section>

      <PromoCards />
      <JournalSection />
    </>
  )
}