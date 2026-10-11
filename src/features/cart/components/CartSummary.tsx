import { useId, useState, type SubmitEvent, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { getApiError } from '@/lib/http'
import { formatEthExact } from '@/lib/money'
import { useApplyCoupon, useRemoveCoupon } from '../hooks'
import type { Quote } from '../types'

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kurio-cream'

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-kurio-cream">{label}</dt>
      <dd className="text-kurio-cream">{children}</dd>
    </div>
  )
}
export default function CartSummary({ quote }: { quote: Quote }) {
  const id = useId()
  const [code, setCode] = useState('')
  const apply = useApplyCoupon()
  const remove = useRemoveCoupon()

  const couponError = apply.isError ? getApiError(apply.error).message : null

  const handleApply = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    apply.mutate(code, { onSuccess: () => setCode('') })
  }

  return (
    <section aria-labelledby={`${id}-titulo`}>
      <h2
        id={`${id}-titulo`}
        className="border-b border-kurio-gold/30 pb-2 text-sm font-bold text-kurio-cream"
      >
        Resumo da carteira
      </h2>

      <form noValidate onSubmit={handleApply} className="mt-4">
        <label htmlFor={`${id}-cupom`} className="text-xs font-bold text-kurio-cream">
          Código promocional
        </label>
        <div className="mt-2 flex overflow-hidden rounded-md border border-kurio-gold/40">
          <input
            id={`${id}-cupom`}
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
              if (apply.isError) apply.reset()
            }}
            placeholder="Digite o código promocional..."
            autoComplete="off"
            aria-invalid={couponError ? true : undefined}
            aria-describedby={couponError ? `${id}-erro` : undefined}
            className={`min-w-0 flex-1 bg-kurio-bg px-3 py-2 text-xs text-kurio-cream placeholder:text-kurio-gold focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-kurio-cream`}
          />
          <button
            type="submit"
            disabled={apply.isPending}
            className={`cursor-pointer bg-kurio-accent px-4 text-xs font-bold text-kurio-bg transition-colors hover:bg-kurio-accent-hover disabled:cursor-wait disabled:opacity-60 ${focusRing}`}
          >
            {apply.isPending ? '...' : 'Aplicar'}
          </button>
        </div>

        {couponError && (
          <p id={`${id}-erro`} role="alert" className="mt-2 text-xs text-kurio-accent-hover">
            {couponError}
          </p>
        )}
      </form>

      {quote.coupon && (
        <p role="status" className="mt-3 text-xs text-kurio-sand">
          Cupom <strong className="text-kurio-cream">{quote.coupon.code}</strong> aplicado:{' '}
          {quote.coupon.description}.{' '}
          <button
            type="button"
            onClick={() => remove.mutate()}
            disabled={remove.isPending}
            className={`cursor-pointer font-bold text-kurio-accent underline underline-offset-2 hover:text-kurio-accent-hover ${focusRing}`}
          >
            Remover cupom
          </button>
        </p>
      )}

      <dl className="mt-5 space-y-2 text-sm">
        <Row label="Subtotal">{formatEthExact(quote.subtotal)}</Row>
        <Row label={quote.coupon ? `Desconto (${quote.coupon.code})` : 'Desconto do lançamento'}>
          (-) {formatEthExact(quote.discount)}
        </Row>
        <div>
          <Row label="Taxa de rede">{formatEthExact(quote.networkFee)}</Row>
          <p className="mt-1 text-right text-[10px] text-kurio-accent">Taxa estimada</p>
        </div>
        <div className="border-t border-kurio-gold/30 pt-3">
          <Row label="Total">
            <span className="font-bold">{formatEthExact(quote.total)}</span>
          </Row>
        </div>
      </dl>

    
      <button
        type="button"
        disabled
        title="Em breve"
        className="mt-5 w-full rounded-lg bg-kurio-accent px-4 py-3 text-sm font-bold text-kurio-bg disabled:cursor-not-allowed disabled:opacity-80"
      >
        Conectar e finalizar
      </button>

      <Link
        to="/"
        hash="explorar"
        className={`mt-4 block text-center text-sm text-kurio-accent underline-offset-4 hover:underline ${focusRing}`}
      >
        Continuar explorando
      </Link>
    </section>
  )
}