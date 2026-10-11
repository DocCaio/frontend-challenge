import axios, { isAxiosError } from 'axios'
import { clearStoredSession, emitSessionEnded, getStoredSession } from './session'
import { getVisitorId } from './visitor'

export const http = axios.create({
  baseURL: '/api',
  timeout: 10_000,
})

http.interceptors.request.use((config) => {
  config.headers.set('X-Visitor-Id', getVisitorId())
  const session = getStoredSession()
  if (session) config.headers.set('Authorization', `Bearer ${session.token}`)
  return config
})

http.interceptors.response.use(undefined, (error: unknown) => {
  const { code } = getApiError(error)
  if ((code === 'SESSION_EXPIRED' || code === 'SESSION_INVALID') && getStoredSession()) {
    clearStoredSession()
    emitSessionEnded(code)
  }
  return Promise.reject(error)
})

export interface ApiErrorBody {
  code: string
  message: string
  [key: string]: unknown
}


export function getApiError(error: unknown): ApiErrorBody {
  if (isAxiosError<ApiErrorBody>(error)) {
    if (error.response?.data?.code) return error.response.data
    if (error.code === 'ECONNABORTED') {
      return { code: 'TIMEOUT', message: 'A requisição demorou demais. Tente novamente.' }
    }
    if (!error.response) {
      return { code: 'NETWORK_ERROR', message: 'Sem conexão com o servidor. Tente novamente.' }
    }
  }
  return { code: 'UNKNOWN', message: 'Algo deu errado. Tente novamente.' }
}