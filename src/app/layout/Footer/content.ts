import type { IconType } from 'react-icons'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa6'

export const features = [
  {
    letter: 'W',
    title: 'Segurança da carteira',
    description: 'Proteja sua carteira e colecione arte digital verificada com confiança.',
  },
  {
    letter: 'C',
    title: 'Criadores em destaque',
    description: 'Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.',
  },
  {
    letter: 'D',
    title: 'Alertas de lançamentos',
    description: 'Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.',
  },
]

export const contact = {
  tagline: 'Feito para colecionadores, criadores e cultura',
  email: 'contato@email.com',
  phone: '+55 11 4002 8922',
  phoneHref: 'tel:+551140028922',
}

export interface FooterLink {
  label: string
  collection?: string
}

export interface LinkColumn {
  id: string
  title: string
  links: FooterLink[]
}

export const linkColumns: LinkColumn[] = [
  {
    id: 'perfil',
    title: 'Meu perfil',
  
    links: [
      { label: 'Meu perfil' },
      { label: 'Minha coleção' },
      { label: 'Atividade' },
      { label: 'Estúdio do criador' },
      { label: 'Lista de interesse' },
    ],
  },
  {
    id: 'ajuda',
    title: 'Central de ajuda',
    links: [
      { label: 'Central de ajuda' },
      { label: 'Como comprar NFTs' },
      { label: 'Carteira e segurança' },
      { label: 'Política do mercado' },
      { label: 'Denunciar item' },
    ],
  },
  {
    id: 'colecoes',
    title: 'Coleções',
    links: [
      { label: 'Arte digital', collection: 'Arte digital' },
      { label: 'Fotografia', collection: 'Fotografia' },
      { label: 'Música', collection: 'Música' },
      { label: 'Arte 3D', collection: 'Arte 3D' },
      { label: 'Utilidade', collection: 'Utilidade' },
    ],
  },
]

export interface SocialLink {
  label: string
  href: string
  icon: IconType
}

export const socials: SocialLink[] = [
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: FaFacebookF },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: FaInstagram },
  { label: 'Twitter', href: 'https://twitter.com/', icon: FaTwitter },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: FaLinkedinIn },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: FaYoutube },
]

export const wallets = ['MetaMask', 'WalletConnect', 'Coinbase']


export const COPYRIGHT_YEAR = 2026