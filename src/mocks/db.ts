import type { Nft, Network } from '@/features/catalog/types'
import emeraldApe from '@/assets/nfts/emerald-ape.png'
import sageNomad from '@/assets/nfts/sage-nomad.png'
import neonVessel from '@/assets/nfts/neon-vessel.png'
import goldenBeat from '@/assets/nfts/golden-beat.png'


const base = [
  { name: 'Emerald Ape', price: '1.19', image: emeraldApe },
  { name: 'Sage Nomad', price: '1.69', image: sageNomad },
  { name: 'Neon Vessel', price: '1.99', originalPrice: '2.29', image: neonVessel },
  { name: 'Cosmic Bloom', price: '1.29', image: sageNomad },
  { name: 'Violet Nomad', price: '1.39', image: sageNomad },
  { name: 'Ivory Baron', price: '1.79', image: neonVessel },
  { name: 'Golden Beat', price: '0.99', image: goldenBeat },
  { name: 'Golden Frequency', price: '0.29', image: goldenBeat },
  { name: 'Golden Signal', price: '0.29', image: goldenBeat },
]

export const collections = [
  'Arte digital',
  'Fotografia',
  'Música',
  'Arte 3D',
  'Colecionáveis',
  'Generativa',
  'Jogos',
  'Assinaturas',
  'Utilidade',
]

export const networks: Network[] = ['Ethereum', 'Polygon', 'Solana']


const FEATURED_ID = 'nft-004'


export function createNfts(): Nft[] {
  return Array.from({ length: 48 }, (_, i) => {
    const b = base[i % base.length]
    const edition = String(i + 1).padStart(3, '0')
    return {
      id: `nft-${edition}`,
      name: b.name,
      edition,
      imageUrl: b.image,
      price: b.price,
      originalPrice: b.originalPrice,
      currency: 'ETH',
     
      collection: collections[(i + Math.floor(i / 9)) % collections.length],
      network: networks[(i + Math.floor(i / 4)) % networks.length],
      available: (i % 5) + 1,
      version: 1,
      badge: i % 7 === 0 ? 'new' : undefined,
    }
  })
}

export const db = {
  nfts: createNfts(),
  featuredId: FEATURED_ID,
  reset() {
    this.nfts = createNfts()
  },
}