import axios, { isAxiosError } from 'axios'
import { getVisitorId } from './visitor'

export const http = axios.create({
  baseURL: '/api',
  timeout: 10_000,
})

http.interceptors.request.use((config) => {
  config.headers.set('X-Visitor-Id', getVisitorId())
  return config
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