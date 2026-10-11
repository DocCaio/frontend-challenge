const KEY = 'kurio.visitorId'

export function getVisitorId(): string {
  try {
    const existing = localStorage.getItem(KEY)
    if (existing) return existing
    const id = crypto.randomUUID()
    localStorage.setItem(KEY, id)
    return id
  } catch {
    return 'anonymous' 
  }
}