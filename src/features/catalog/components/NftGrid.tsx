import type { ReactNode } from 'react'
import { useNfts } from '../hooks'
import type { Nft, NftListParams } from '../types' 
import NftCard from './NftCard'

const gridClass = 'grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 xl:gap-x-8'

interface NftGridProps {
  params: NftListParams
  renderAction?: (nft: Nft) => ReactNode 
}

const Skeleton = () => (
  <div aria-hidden="true">
    <div className="rounded-lg bg-kurio-surface px-4 py-2">
      <div className="aspect-[4/5] w-full animate-pulse rounded-2xl bg-kurio-bg/60 motion-reduce:animate-none" />
    </div>
    <div className="mt-3 space-y-1">
      <div className="h-5 w-2/3 animate-pulse rounded bg-kurio-surface motion-reduce:animate-none" />
      <div className="h-5 w-1/3 animate-pulse rounded bg-kurio-surface motion-reduce:animate-none" />
    </div>
  </div>
)

export default function NftGrid({ params, renderAction }: NftGridProps) {
  const { data, isPending, isError, refetch } = useNfts(params)

  if (isError)
    return (
      <div role="alert" className="p-6">
        <p>Não foi possível carregar os NFTs.</p>
        <button
          onClick={() => refetch()}
          className="mt-2 rounded-lg bg-kurio-accent px-4 py-2 text-kurio-bg"
        >
          Tentar novamente
        </button>
      </div>
    )

  if (isPending)
    return (
      <div className={gridClass} aria-busy="true">
        {Array.from({ length: 9 }, (_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    )

  if (data.items.length === 0)
    return <p className="p-6 text-kurio-sand">Nenhum NFT encontrado com esses filtros.</p>

  return (
    <div className={gridClass}>
      {data.items.map((nft) => (
        <div key={nft.id} className="flex flex-col gap-3">
          <NftCard nft={nft} />
          {renderAction && renderAction(nft)}
        </div>
      ))}
    </div>
  )
}