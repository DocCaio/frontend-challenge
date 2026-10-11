import { HttpResponse } from 'msw'

export type Json = Record<string, unknown>

export async function readBody(request: Request): Promise<Json> {
  try {
    return (await request.json()) as Json
  } catch {
    return {}
  }
}

export const fail = (status: number, code: string, message: string, extra: Json = {}) =>
  HttpResponse.json({ code, message, ...extra }, { status })