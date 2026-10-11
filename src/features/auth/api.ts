import { http } from '@/lib/http'
import type { AuthResult, LoginInput, RegisterInput, User } from './types'

export async function login(input: LoginInput): Promise<AuthResult> {
  const { data } = await http.post<AuthResult>('/auth/login', input)
  return data
}

export async function register(input: RegisterInput): Promise<AuthResult> {
  const { data } = await http.post<AuthResult>('/auth/register', input)
  return data
}

export async function logout(): Promise<void> {
  await http.post('/auth/logout')
}

export async function fetchSession(signal?: AbortSignal): Promise<User> {
  const { data } = await http.get<{ user: User }>('/auth/session', { signal })
  return data.user
}