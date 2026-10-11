import type { ReactNode } from 'react'
import { useNfts } from '../hooks'
import type { Nft, NftListParams } from '../types'
import NftCard from './NftCard'

const gridClass = 'grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 xl:gap-x-8'


const Skeleton = () => (
  <div aria-hidden="true">
    <div className="rounded-lg bg-kurio-surface px-4 py-2">
      <div className="skeleton aspect-[4/5] w-full rounded-2xl" />
    </div>
    <div className="mt-3 space-y-1">
      <div className="skeleton h-5 w-2/3 rounded" />
      <div className="skeleton h-5 w-1/3 rounded" />
    </div>
  </div>
)

interface Props {
  params: NftListParams
  renderAction?: (nft: Nft) => ReactNode
}

export default function NftGrid({ params, renderAction }: Props) {
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
        <NftCard key={nft.id} nft={nft} action={renderAction?.(nft)} />
      ))}
    </div>
  )
}