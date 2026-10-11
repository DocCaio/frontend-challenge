import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getApiError } from '@/lib/http'
import { clearPrivateCache } from '@/lib/privateCache'
import { clearStoredSession, storeSession, useStoredSession } from '@/lib/session'
import { fetchSession, login, logout, register } from './api'
import type { AuthResult, User } from './types'

export const authKeys = {
  session: (userId: string | null) => ['auth', 'session', userId] as const,
}

const isSessionError = (error: unknown) => {
  const { code } = getApiError(error)
  return code === 'SESSION_EXPIRED' || code === 'SESSION_INVALID'
}


export function useSession() {
  const stored = useStoredSession()

  return useQuery({
    queryKey: authKeys.session(stored?.userId ?? null),
    queryFn: async ({ signal }): Promise<User | null> => {
      if (!stored) return null
      try {
        return await fetchSession(signal)
      } catch (error) {
        if (isSessionError(error)) return null
        throw error
      }
    },
    initialData: stored ? undefined : null,
    staleTime: 5 * 60_000,
    retry: false,
  })
}

function useEnterSession() {
  const qc = useQueryClient()

  return ({ user, token }: AuthResult) => {
    clearPrivateCache(qc) 
    storeSession({ token, userId: user.id })
    qc.setQueryData(authKeys.session(user.id), user)
  }
}

export function useLogin() {
  const enter = useEnterSession()
  return useMutation({ mutationFn: login, onSuccess: enter })
}

export function useRegister() {
  const enter = useEnterSession()
  return useMutation({ mutationFn: register, onSuccess: enter })
}

export function useLogout() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: logout,
   
    onSettled: () => {
      clearStoredSession()
      clearPrivateCache(qc)
    },
  })
}