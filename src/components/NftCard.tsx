import { formatEth } from '@/lib/money'
import type { Nft } from '../features/catalog/types'

export default function NftCard({ nft }: { nft: Nft }) {
  return (
    <article>

      <div className="relative rounded-lg bg-kurio-surface px-4 py-2">
        {nft.badge === 'new' && (
          <span className="absolute left-6 top-4 z-10 rounded bg-kurio-accent px-2 py-0.5 text-xs font-semibold text-kurio-bg">
            Novo
          </span>
        )}
        <img
          src={nft.imageUrl}
          alt={`${nft.name} #${nft.edition}`}
          width={226}
          height={282}
          loading="lazy"
          className="aspect-[4/5] w-full rounded-2xl object-cover"
        />
      </div>


      <div className="mt-3 space-y-1">
        <h3 className="text-sm text-kurio-cream">
          {nft.name} #{nft.edition}
        </h3>

        <p className="flex items-baseline gap-2 text-sm font-bold text-kurio-accent-hover">
          <span>{formatEth(nft.price)}</span>
          {nft.originalPrice && (
            <span className="text-xs font-normal line-through opacity-70">
              {formatEth(nft.originalPrice)}
            </span>
          )}
        </p>
      </div>
    </article>
  )
}