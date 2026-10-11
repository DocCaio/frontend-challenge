import { formatEth } from '@/lib/money'
import type { Nft } from '../features/catalog/types'

export default function NftCard({ nft }: { nft: Nft }) {
  return (
    <article className="overflow-hidden rounded-xl bg-kurio-surface py-2">
      <div className="relative">
        {nft.badge === 'new' && (
          <span className="absolute left-2 top-2 z-10 rounded bg-kurio-accent px-2 py-0.5 text-xs font-semibold text-kurio-bg">
            Novo
          </span>
        )}
        <img
          src={nft.imageUrl}
          alt={`${nft.name} #${nft.edition}`}
          width={300}
          height={300}
          loading="lazy"
          className="aspect-square w-full rounded-lg object-cover"
        />
      </div>

      <div className="space-y-1 px-3 pb-1 pt-3">
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