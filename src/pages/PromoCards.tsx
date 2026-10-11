import { Link } from '@tanstack/react-router'
import emeraldApe from '@/assets/nfts/emerald-ape.png'
import neonVessel from '@/assets/nfts/neon-vessel.png'

interface PromoSearch {
  collection?: string
  sort: 'recent'
  page: number
}

interface Promo {
  id: string
  title: string
  description: string
  image: string
  alt: string
  search: PromoSearch
}

const promos: Promo[] = [
  {
    id: 'lancamentos-genesis',
    title: 'Lançamentos gênesis de edição limitada',
    description:
      'Colecione edições escassas diretamente dos criadores antes da revelação pública.',
    image: emeraldApe,
    alt: 'Macaco de óculos redondos e jaqueta verde',
    search: { sort: 'recent', page: 1 },
  },
  {
    id: 'arte-digital-selecionada',
    title: 'Arte digital selecionada e muito mais',
    description:
      'Explore novos artistas, coleções verificadas e obras digitais que definem a nova era.',
    image: neonVessel,
    alt: 'Macaco de cabelo escuro, brinco e blazer bege',
    search: { collection: 'Arte digital', sort: 'recent', page: 1 },
  },
]

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    className="h-4 w-4 shrink-0"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
    />
  </svg>
)


const Swirl = () => (
  <svg
    viewBox="0 0 70 110"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="pointer-events-none absolute -left-1 bottom-0 z-10 h-24 w-14 text-kurio-accent sm:h-28 sm:w-16"
    aria-hidden="true"
  >
    <path d="M2 108C2 60 30 20 66 4" />
    <path d="M12 108C14 70 36 40 62 26" />
  </svg>
)

export default function PromoCards() {
  return (
    <section
      aria-label="Destaques da Kurio"
      className="page-container grid gap-4 pb-12 lg:grid-cols-2 lg:gap-6"
    >
      {promos.map((promo) => (
        <article
          key={promo.id}
          className="relative flex overflow-hidden rounded-xl bg-kurio-surface"
        >
          <img
            src={promo.image}
            alt={promo.alt}
            width={250}
            height={250}
            loading="lazy"
            className="aspect-square w-2/5 max-w-[250px] shrink-0 rounded-2xl object-cover"
          />
          <Swirl />

          <div className="flex min-w-0 flex-1 flex-col items-end justify-between gap-3 p-3 text-right sm:p-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold leading-snug text-kurio-cream sm:text-lg">
                {promo.title}
              </h3>
              <p className="text-xs leading-relaxed text-kurio-sand sm:text-sm">
                {promo.description}
              </p>
            </div>

            <Link
              to="/"
              search={promo.search}
              hash="explorar"
              className="inline-flex items-center gap-2 rounded-lg bg-kurio-accent px-4 py-2 text-xs font-medium text-kurio-bg transition-colors hover:bg-kurio-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kurio-cream sm:text-sm"
            >
              Explorar
              <ArrowIcon />
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}