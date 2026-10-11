import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { getApiError } from '@/lib/http'
import { useAddToCart } from '../hooks'

interface Props {
  nftId: string
  quantity?: number
  label?: string
  className?: string
}

 
export default function AddToCartButton({
  nftId,
  quantity = 1,
  label = 'Comprar',
  className = '',
}: Props) {
  const navigate = useNavigate()
  const add = useAddToCart()
  const [error, setError] = useState<string | null>(null)

  const handleClick = () => {
    setError(null)
    add.mutate(
      { nftId, quantity },
      {
        onSuccess: () => navigate({ to: '/carrinho' }),
        onError: (e) => setError(getApiError(e).message),
      },
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={add.isPending} 
        aria-busy={add.isPending}
        className={`cursor-pointer rounded-lg bg-kurio-accent px-4 py-2 text-xs font-bold uppercase text-kurio-bg transition-colors hover:bg-kurio-accent-hover disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kurio-cream ${className}`}
      >
        {add.isPending ? 'Adicionando...' : label}
      </button>

      {error && (
        <p role="alert" className="mt-1 text-xs text-kurio-accent-hover">
          {error}
        </p>
      )}
    </>
  )
}