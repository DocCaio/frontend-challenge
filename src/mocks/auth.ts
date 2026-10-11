import { http, HttpResponse } from 'msw'
import { db } from './db'
import { fail } from './utils'

export const SESSION_TTL_MS = 2 * 60 * 60 * 1000 // 2 horas

// ============================
// Sessões
// ============================

export function createSession(userId: string): string {
  const token = crypto.randomUUID()

  db.sessions[token] = {
    userId,
    expiresAt: Date.now() + SESSION_TTL_MS,
  }

  db.saveSessions()

  return token
}

export function destroySession(token: string): void {
  delete db.sessions[token]
  db.saveSessions()
}

export function bearerToken(request: Request): string | null {
  const header = request.headers.get('Authorization')

  return header?.startsWith('Bearer ')
    ? header.slice(7)
    : null
}

// ============================
// Autenticação
// ============================

type AuthResult =
  | { status: 'none' }
  | { status: 'invalid' }
  | { status: 'expired' }
  | { status: 'ok'; userId: string; token: string }

export function authenticate(request: Request): AuthResult {
  const token = bearerToken(request)

  if (!token) {
    return { status: 'none' }
  }

  const session = db.sessions[token]

  if (!session) {
    return { status: 'invalid' }
  }

  if (session.expiresAt <= Date.now()) {
    destroySession(token)
    return { status: 'expired' }
  }

  return {
    status: 'ok',
    userId: session.userId,
    token,
  }
}

// ============================
// Identificação do usuário
// ============================

export type Identity =
  | { ok: true; owner: string; userId: string | null }
  | { ok: false; response: Response }

export function identify(request: Request): Identity {
  const auth = authenticate(request)

  if (auth.status === 'ok') {
    return {
      ok: true,
      owner: `user:${auth.userId}`,
      userId: auth.userId,
    }
  }

  if (auth.status === 'expired') {
    return {
      ok: false,
      response: fail(
        401,
        'SESSION_EXPIRED',
        'Sua sessão expirou. Entre novamente.',
      ),
    }
  }

  if (auth.status === 'invalid') {
    return {
      ok: false,
      response: fail(
        401,
        'SESSION_INVALID',
        'Sessão inválida. Entre novamente.',
      ),
    }
  }

  const visitor = request.headers.get('X-Visitor-Id')

  if (!visitor) {
    return {
      ok: false,
      response: fail(
        400,
        'VISITOR_REQUIRED',
        'Identificador de visitante ausente.',
      ),
    }
  }

  return {
    ok: true,
    owner: visitor,
    userId: null,
  }
}

// ============================
// Handlers HTTP do MSW
// ============================

// Ajuste os campos de usuário e a validação de senha
// de acordo com a estrutura real do seu banco.

export const authHandlers = [
  http.post('/api/auth/logout', ({ request }) => {
    const auth = authenticate(request)

    if (auth.status === 'none') {
      return HttpResponse.json(
        {
          code: 'TOKEN_REQUIRED',
          message: 'Token de autenticação ausente.',
        },
        { status: 401 },
      )
    }

    if (auth.status !== 'ok') {
      return HttpResponse.json(
        {
          code:
            auth.status === 'expired'
              ? 'SESSION_EXPIRED'
              : 'SESSION_INVALID',
          message:
            auth.status === 'expired'
              ? 'Sua sessão expirou. Entre novamente.'
              : 'Sessão inválida. Entre novamente.',
        },
        { status: 401 },
      )
    }

    destroySession(auth.token)

    return HttpResponse.json({
      success: true,
      message: 'Logout realizado com sucesso.',
    })
  }),

  http.get('/api/auth/me', ({ request }) => {
    const auth = authenticate(request)

    if (auth.status !== 'ok') {
      return HttpResponse.json(
        {
          code:
            auth.status === 'expired'
              ? 'SESSION_EXPIRED'
              : auth.status === 'invalid'
                ? 'SESSION_INVALID'
                : 'TOKEN_REQUIRED',
          message: 'Não foi possível autenticar a sessão.',
        },
        { status: 401 },
      )
    }

    return HttpResponse.json({
      userId: auth.userId,
    })
  }),
]