import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import CartSummary from '@/features/cart/components/CartSummary'
import CartTable from '@/features/cart/components/CartTable'
import { useCart, useRemoveCartItem, useUpdateCartItem } from '@/features/cart/hooks'
import type { CartItem } from '@/features/cart/types'
import { getApiError } from '@/lib/http'

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kurio-cream'

function Breadcrumb() {
  return (
    <nav aria-label="Você está em" className="text-xs text-kurio-cream">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className={`hover:text-kurio-accent-hover ${focusRing}`}>
            Início
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>Mercado</li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-kurio-accent">
          Carrinho
        </li>
      </ol>
    </nav>
  )
}


function CartSkeleton() {
  return (
    <div
      aria-busy="true"
      className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12"
    >
      <span role="status" className="sr-only">
        Carregando carrinho...
      </span>
      <div className="space-y-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton h-[72px] rounded-lg" />
        ))}
      </div>
      <div className="space-y-3" aria-hidden="true">
        <div className="skeleton h-6 w-1/2 rounded" />
        <div className="skeleton h-10 rounded" />
        <div className="skeleton h-40 rounded" />
        <div className="skeleton h-12 rounded-lg" />
      </div>
    </div>
  )
}

export default function CartPage() {
  const { data: cart, isPending, isError, isFetching, refetch } = useCart()
  const update = useUpdateCartItem()
  const remove = useRemoveCartItem()
  const [notice, setNotice] = useState<string | null>(null)

  const changeQuantity = (item: CartItem, quantity: number) => {
    setNotice(null)
    update.mutate(
      { nftId: item.nftId, quantity },
      { onError: (e) => setNotice(getApiError(e).message) },
    )
  }

  const removeItem = (item: CartItem) => {
    setNotice(null)
    remove.mutate(item.nftId, { onError: (e) => setNotice(getApiError(e).message) })
  }

  return (
    <div className="page-container py-6 md:py-10">
      <Breadcrumb />
      <h1 className="sr-only">Carrinho de NFTs</h1>

      {notice && (
        <p role="alert" className="mt-4 rounded-lg bg-kurio-surface px-4 py-3 text-sm text-kurio-accent-hover">
          {notice}
        </p>
      )}

      {isPending ? (
        <CartSkeleton />
      ) : isError ? (
        <div role="alert" className="mt-6">
          <p>Não foi possível carregar o seu carrinho.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className={`mt-2 cursor-pointer rounded-lg bg-kurio-accent px-4 py-2 text-sm font-bold text-kurio-bg ${focusRing}`}
          >
            Tentar novamente
          </button>
        </div>
      ) : cart.items.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="text-kurio-cream">Seu carrinho está vazio.</p>
          <Link
            to="/"
            hash="explorar"
            className={`mt-3 inline-block rounded-lg bg-kurio-accent px-5 py-2 text-sm font-bold text-kurio-bg hover:bg-kurio-accent-hover ${focusRing}`}
          >
            Explorar NFTs
          </Link>
        </div>
      ) : (
        <div
          aria-busy={isFetching}
          className="mt-4 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12"
        >
          <CartTable
            items={cart.items}
            onChangeQuantity={changeQuantity}
            onRemove={removeItem}
          />
          <CartSummary quote={cart.quote} />
        </div>
      )}
    </div>
  )
}