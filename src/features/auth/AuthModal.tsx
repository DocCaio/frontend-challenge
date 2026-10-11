import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import { FaEye, FaEyeSlash, FaFacebook, FaXmark } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import type { ZodType } from 'zod'
import { getApiError } from '@/lib/http'
import { useLogin, useRegister } from './hooks'
import { loginSchema, registerSchema } from './schemas'

type Mode = 'login' | 'register'
type FieldName = 'name' | 'email' | 'password' | 'confirmPassword'
type FieldErrors = Partial<Record<FieldName, string>>

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  authMode: Mode
  setAuthMode: (mode: Mode) => void
}



interface FieldProps {
  name: FieldName
  label: string
  placeholder: string
  type?: string
  autoComplete?: string
  error?: string
  trailing?: ReactNode
}

function Field({ name, label, placeholder, type = 'text', autoComplete, error, trailing }: FieldProps) {
  const id = useId()

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-erro` : undefined}
          className={`w-full rounded-xl border bg-[#1c120e] px-4 py-3 text-sm text-[#F5F1EB] placeholder-[#7d6855] focus:border-[#D28A4C] focus:outline-none focus:ring-1 focus:ring-[#D28A4C] ${
            trailing ? 'pr-10' : ''
          } ${error ? 'border-[#e89b55]' : 'border-[#3b271e]'}`}
        />
        {trailing}
      </div>
      {error && (
        <p id={`${id}-erro`} role="alert" className="mt-1 text-xs text-[#e89b55]">
          {error}
        </p>
      )}
    </div>
  )
}



function validate<T>(schema: ZodType<T>, raw: unknown): { data: T } | { errors: FieldErrors } {
  const result = schema.safeParse(raw)
  if (result.success) return { data: result.data }

  const errors: FieldErrors = {}
  for (const issue of result.error.issues) {
    const key = String(issue.path[0]) as FieldName
    if (!errors[key]) errors[key] = issue.message
  }
  return { errors }
}

function focusField(form: HTMLFormElement, name: string | undefined) {
  if (name) form.querySelector<HTMLInputElement>(`[name="${name}"]`)?.focus()
}

function AuthForm({ mode, onSuccess }: { mode: Mode; onSuccess: () => void }) {
  const isRegister = mode === 'register'
  const login = useLogin()
  const register = useRegister()
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const pending = login.isPending || register.isPending

  const handleApiError = (form: HTMLFormElement) => (error: unknown) => {
    const api = getApiError(error)
    const fields = (api.fields ?? {}) as FieldErrors
    if (Object.keys(fields).length > 0) {
      setErrors(fields)
      focusField(form, Object.keys(fields)[0])
    } else {
      setFormError(api.message)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const raw = Object.fromEntries(new FormData(form))

    setFormError(null)

    if (isRegister) {
      const result = validate(registerSchema, raw)
      if ('errors' in result) {
        setErrors(result.errors)
        focusField(form, Object.keys(result.errors)[0])
        return
      }
      setErrors({})
      const { name, email, password } = result.data
      register.mutate({ name, email, password }, { onSuccess, onError: handleApiError(form) })
      return
    }

    const result = validate(loginSchema, raw)
    if ('errors' in result) {
      setErrors(result.errors)
      focusField(form, Object.keys(result.errors)[0])
      return
    }
    setErrors({})
    login.mutate(result.data, { onSuccess, onError: handleApiError(form) })
  }

  const eyeButton = (
    <button
      type="button"
      onClick={() => setShowPassword((s) => !s)}
      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
      aria-pressed={showPassword}
      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#7d6855] hover:text-[#D28A4C] focus-visible:outline-2 focus-visible:outline-[#D28A4C]"
    >
      {showPassword ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
    </button>
  )

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-4">
      {isRegister && (
        <Field
          name="name"
          label="Nome de usuário"
          placeholder="Nome de usuário"
          autoComplete="username"
          error={errors.name}
        />
      )}

      <Field
        name="email"
        type="email"
        label="E-mail"
        placeholder={isRegister ? 'Digite seu e-mail' : 'contato@email.com'}
        autoComplete="email"
        error={errors.email}
      />

      <Field
        name="password"
        type={showPassword ? 'text' : 'password'}
        label="Senha"
        placeholder={isRegister ? 'Senha' : '************'}
        autoComplete={isRegister ? 'new-password' : 'current-password'}
        error={errors.password}
        trailing={eyeButton}
      />

      {isRegister && (
        <Field
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          label="Confirmar senha"
          placeholder="Confirmar senha"
          autoComplete="new-password"
          error={errors.confirmPassword}
        />
      )}

      {!isRegister && (
        <div className="text-right">
      
          <button
            type="button"
            disabled
            title="Em breve"
            className="text-xs text-[#D28A4C] disabled:cursor-not-allowed disabled:opacity-70"
          >
            Esqueceu a senha?
          </button>
        </div>
      )}

      {formError && (
        <p role="alert" className="rounded-lg bg-[#1c120e] px-3 py-2 text-xs text-[#e89b55]">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="mt-2 w-full cursor-pointer rounded-xl bg-[#D28A4C] py-3 text-sm font-bold text-[#110A07] transition-all hover:bg-[#c27a3c] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F1EB]"
      >
        {pending
          ? isRegister
            ? 'Criando conta...'
            : 'Entrando...'
          : isRegister
            ? 'Criar conta'
            : 'Entrar'}
      </button>
    </form>
  )
}



export function AuthModal({ isOpen, onClose, authMode, setAuthMode }: AuthModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()


  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  const tabClass = (active: boolean) =>
    `cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5F1EB] ${
      active ? 'text-[#D28A4C]' : 'text-[#8E7866] hover:text-[#C2B5A5]'
    }`

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
    
        if (e.target === e.currentTarget) onClose()
      }}
      className="m-auto w-full max-w-[512px] bg-transparent p-4 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      {isOpen && (
        <div className="relative max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border border-[#3b271e] bg-[#140c09] p-6 text-[#F5F1EB] shadow-2xl md:p-8">
          <h2 id={titleId} className="sr-only">
            {authMode === 'login' ? 'Entrar' : 'Criar conta'}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-5 top-5 cursor-pointer text-[#8E7866] transition-colors hover:text-[#D28A4C] focus-visible:outline-2 focus-visible:outline-[#D28A4C]"
          >
            <FaXmark aria-hidden="true" className="h-5 w-5" />
          </button>

          <div className="mb-6 flex items-center justify-center gap-4 text-xl font-medium">
            <button
              type="button"
              aria-pressed={authMode === 'login'}
              onClick={() => setAuthMode('login')}
              className={tabClass(authMode === 'login')}
            >
              Entrar
            </button>
            <span aria-hidden="true" className="h-5 w-px bg-[#3b271e]" />
            <button
              type="button"
              aria-pressed={authMode === 'register'}
              onClick={() => setAuthMode('register')}
              className={tabClass(authMode === 'register')}
            >
              Criar conta
            </button>
          </div>

          <p className="mb-6 px-4 text-center text-xs leading-relaxed text-[#9e8875]">
            {authMode === 'login'
              ? 'Entre para gerenciar sua carteira, coleção e perfil de criador.'
              : 'Crie seu perfil de colecionador e conecte uma carteira quando quiser.'}
          </p>


          <AuthForm key={authMode} mode={authMode} onSuccess={onClose} />

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#3b271e]" />
            </div>
            <span className="relative bg-[#140c09] px-4 text-xs text-[#8E7866]">
              Ou continue com
            </span>
          </div>

 
          <div className="space-y-3">
            <button
              type="button"
              disabled
              title="Em breve"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#3b271e] bg-[#1c120e] py-3 text-sm font-medium text-[#F5F1EB] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FcGoogle aria-hidden="true" className="h-5 w-5" />
              Continuar com Google
            </button>
            <button
              type="button"
              disabled
              title="Em breve"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#3b271e] bg-[#1c120e] py-3 text-sm font-medium text-[#F5F1EB] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaFacebook aria-hidden="true" className="h-5 w-5 text-[#1877F2]" />
              Continuar com Facebook
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}