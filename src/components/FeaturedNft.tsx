import { useFeaturedNft } from '../features/catalog/hooks'

export default function FeaturedNft() {
  const { data: nft, isPending, isError } = useFeaturedNft()

  if (isError) return null

  return (
    <section
      aria-labelledby="destaque-titulo"
      className="overflow-hidden rounded-xl bg-kurio-surface pt-5"
    >
      <h2
        id="destaque-titulo"
        className="px-5 text-xl font-bold uppercase text-kurio-accent-hover"
      >
        NFT em destaque
      </h2>
      <p className="mt-2 text-center font-bold uppercase text-kurio-cream">
        Oferta limitada
      </p>

      
      <div className="mt-4 aspect-square w-full">
        {isPending ? (
          <div
            className="h-full w-full animate-pulse rounded-2xl bg-kurio-bg/60 motion-reduce:animate-none"
            aria-hidden="true"
          />
        ) : (
          <img
            src={nft.imageUrl}
            alt={`${nft.name} #${nft.edition}, oferta limitada`}
            width={300}
            height={300}
            className="h-full w-full rounded-2xl object-cover"
          />
        )}
      </div>
    </section>
  )
}