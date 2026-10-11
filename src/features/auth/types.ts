export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string | null
}

export interface AuthResult {
  user: User
  token: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
}