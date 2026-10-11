import { db, type CartState } from './db'

export function getCartState(owner: string): CartState {
  return (db.carts[owner] ??= { lines: [], couponCode: null, version: 0 })
}

export function commitCart(state: CartState) {
  state.version += 1
  db.saveCarts()
}

export function mergeCarts(fromOwner: string | null, toOwner: string) {
  if (!fromOwner || fromOwner === toOwner) return
  const from = db.carts[fromOwner]
  if (!from || from.lines.length === 0) return

  const to = getCartState(toOwner)

  for (const line of from.lines) {
    const nft = db.nfts.find((n) => n.id === line.nftId)
    if (!nft) continue

    const existing = to.lines.find((l) => l.nftId === line.nftId)
    const quantity = Math.min((existing?.quantity ?? 0) + line.quantity, nft.available)

    if (existing) existing.quantity = quantity
    else to.lines.push({ nftId: line.nftId, quantity })
  }

  if (!to.couponCode) to.couponCode = from.couponCode

  delete db.carts[fromOwner]
  commitCart(to)
}