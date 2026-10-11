import { useId, useState, type SubmitEvent } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface Status {
  kind: 'error' | 'info'
  text: string
}

export default function Newsletter() {
  const id = useId()
  const [status, setStatus] = useState<Status | null>(null)

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim()

    if (!EMAIL_RE.test(email)) {
      setStatus({ kind: 'error', text: 'Digite um e-mail válido.' })
      return
    }

    setStatus({
      kind: 'info',
      text: 'A inscrição na newsletter não está disponível nesta demonstração.',
    })
  }

  return (
    <div>
      <h2 id={`${id}-titulo`} className="text-lg font-bold leading-tight text-kurio-cream">
        Antecipe-se ao próximo lançamento
      </h2>

      <form
        noValidate
        onSubmit={handleSubmit}
        aria-labelledby={`${id}-titulo`}
        className="mt-3 flex overflow-hidden rounded-lg"
      >
        <label htmlFor={`${id}-email`} className="sr-only">
          E-mail
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="digite seu e-mail..."
          aria-invalid={status?.kind === 'error'}
          aria-describedby={status ? `${id}-msg` : undefined}
          className="min-w-0 flex-1 bg-kurio-band px-3 py-3 text-sm text-kurio-cream placeholder:text-kurio-gold focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-kurio-cream"
        />
        <button
          type="submit"
          className="cursor-pointer bg-kurio-accent px-4 font-bold text-kurio-bg transition-colors hover:bg-kurio-accent-hover focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-kurio-cream"
        >
          Enviar
        </button>
      </form>

      {status && (
        <p
          id={`${id}-msg`}
          role={status.kind === 'error' ? 'alert' : 'status'}
          className={`mt-2 text-xs ${status.kind === 'error' ? 'text-kurio-accent-hover' : 'text-kurio-sand'}`}
        >
          {status.text}
        </p>
      )}

      <p className="mt-3 text-xs leading-relaxed text-kurio-sand">
        Receba lançamentos selecionados, histórias de criadores e novidades do mercado.
      </p>
    </div>
  )
}