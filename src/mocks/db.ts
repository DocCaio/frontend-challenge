import type { Nft, Network } from '@/features/catalog/types'
import emeraldApe from '@/assets/nfts/emerald-ape.png'
import sageNomad from '@/assets/nfts/sage-nomad.png'
import neonVessel from '@/assets/nfts/neon-vessel.png'
import goldenBeat from '@/assets/nfts/golden-beat.png'
import { hashPassword } from './crypto'
import { userFixtures } from './fixtures/users'


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
      available: 3 + ((i * 7) % 10), // 3 a 12 edições
      version: 1,
      badge: i % 7 === 0 ? 'new' : undefined,
    }
  })
}



export interface CartLine {
  nftId: string
  quantity: number
}

export interface CartState {
  lines: CartLine[]
  couponCode: string | null
  version: number
}

export interface UserRecord {
  id: string
  name: string
  email: string
  salt: string
  passwordHash: string
}

export interface SessionRecord {
  userId: string
  expiresAt: number 
}



const KEYS = {
  carts: 'kurio.mock.carts',
  users: 'kurio.mock.users',
  sessions: 'kurio.mock.sessions',
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {

  }
}


async function seedUsers() {
  let changed = false
  for (const seed of userFixtures) {
    if (db.users.some((u) => u.id === seed.id)) continue
    const salt = `seed-${seed.id}`
    db.users.push({
      id: seed.id,
      name: seed.name,
      email: seed.email,
      salt,
      passwordHash: await hashPassword(seed.password, salt),
    })
    changed = true
  }
  if (changed) db.saveUsers()
}

export const db = {
  nfts: createNfts(),
  featuredId: FEATURED_ID,

  carts: load<Record<string, CartState>>(KEYS.carts, {}),
  users: load<UserRecord[]>(KEYS.users, []),
  sessions: load<Record<string, SessionRecord>>(KEYS.sessions, {}),
  ready: Promise.resolve() as Promise<void>,
  saveCarts() {
    save(KEYS.carts, this.carts)
  },
  saveUsers() {
    save(KEYS.users, this.users)
  },
  saveSessions() {
    save(KEYS.sessions, this.sessions)
  },

  reset() {
    this.nfts = createNfts()
    this.carts = {}
    this.users = []
    this.sessions = {}
    this.saveCarts()
    this.saveUsers()
    this.saveSessions()
    this.ready = seedUsers()
  },
}

db.ready = seedUsers()