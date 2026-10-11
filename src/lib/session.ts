import { useSyncExternalStore } from 'react'

const KEY = 'kurio.session'

export interface StoredSession {
  token: string
  userId: string
}

function read(): StoredSession | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as StoredSession) : null
  } catch {
    return null
  }
}

let current: StoredSession | null = read()
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

export const getStoredSession = () => current

export function storeSession(session: StoredSession) {
  current = session
  try {
    localStorage.setItem(KEY, JSON.stringify(session))
  } catch {
    
  }
  emit()
}

export function clearStoredSession() {
  current = null
  try {
    localStorage.removeItem(KEY)
  } catch {

  }
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}


if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      current = read()
      emit()
    }
  })
}


export function useStoredSession() {
  return useSyncExternalStore(subscribe, getStoredSession, getStoredSession)
}


const endedListeners = new Set<(reason: string) => void>()

export function emitSessionEnded(reason: string) {
  endedListeners.forEach((l) => l(reason))
}

export function onSessionEnded(listener: (reason: string) => void) {
  endedListeners.add(listener)
  return () => {
    endedListeners.delete(listener)
  }
}