import neonVessel from '@/assets/nfts/neon-vessel.png'
import emeraldApe from '@/assets/nfts/emerald-ape.png'
import sageNomad from '@/assets/nfts/sage-nomad.png'
import goldenBeat from '@/assets/nfts/golden-beat.png'

export interface Article {
  id: string
  title: string
  description: string
  image: string
  alt: string
  publishedAt: string 
  readMinutes: number
}


export const articles: Article[] = [
  {
    id: 'propriedade-de-nfts',
    title: 'Como funciona a propriedade de NFTs',
    description: 'Aprenda a colecionar, negociar e verificar ativos digitais.',
    image: neonVessel,
    alt: 'Macaco de cabelo escuro, brinco e blazer bege',
    publishedAt: '2026-09-12',
    readMinutes: 6,
  },
  {
    id: 'artistas-para-acompanhar',
    title: '10 artistas digitais para acompanhar',
    description: 'Conheça criadores que moldam a cultura digital.',
    image: emeraldApe,
    alt: 'Macaco de óculos redondos e jaqueta verde',
    publishedAt: '2026-09-13',
    readMinutes: 2,
  },
  {
    id: 'raridade-atributos-procedencia',
    title: 'Raridade, atributos e procedência',
    description: 'Entenda raridade, procedência, direitos autorais e utilidade.',
    image: sageNomad,
    alt: 'Macaco de chapéu verde e moletom roxo',
    publishedAt: '2026-09-15',
    readMinutes: 3,
  },
  {
    id: 'proteger-sua-carteira',
    title: 'Como proteger sua carteira',
    description: 'Proteja sua carteira, seus ativos e sua identidade.',
    image: goldenBeat,
    alt: 'Macaco dourado com fones de ouvido verdes',
    publishedAt: '2026-09-15',
    readMinutes: 2,
  },
]