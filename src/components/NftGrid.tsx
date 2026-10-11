import { useNfts } from '../features/catalog/hooks'
import type { NftListParams } from '../features/catalog/types'
import NftCard from './NftCard'

const Skeleton = () => (
  <div className="space-y-2" aria-hidden="true">
    <div className="aspect-square animate-pulse rounded-xl bg-kurio-surface motion-reduce:animate-none" />
    <div className="h-4 w-2/3 animate-pulse rounded bg-kurio-surface motion-reduce:animate-none" />
    <div className="h-4 w-1/3 animate-pulse rounded bg-kurio-surface motion-reduce:animate-none" />
  </div>
)

export default function NftGrid({ params }: { params: NftListParams }) {
  const { data, isPending, isError, refetch } = useNfts(params)

  if (isError)
    return (
      <div role="alert" className="p-6">
        <p>Não foi possível carregar os NFTs.</p>
        <button onClick={() => refetch()} className="mt-2 rounded-lg bg-kurio-accent px-4 py-2 text-kurio-bg">
          Tentar novamente
        </button>
      </div>
    )

  if (isPending)
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3" aria-busy="true">
        {Array.from({ length: 9 }, (_, i) => <Skeleton key={i} />)}
      </div>
    )

  if (data.items.length === 0)
    return <p className="p-6 text-kurio-sand">Nenhum NFT encontrado com esses filtros.</p>

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {data.items.map((nft) => <NftCard key={nft.id} nft={nft} />)}
    </div>
  )
}