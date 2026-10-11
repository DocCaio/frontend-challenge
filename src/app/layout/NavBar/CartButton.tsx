import { Link } from '@tanstack/react-router'
import { useCartCount } from '@/features/cart/hooks'

export default function CartButton() {
  const count = useCartCount()

  return (
    <Link
      to="/carrinho"
      aria-label={`Carrinho, ${count} ${count === 1 ? 'item' : 'itens'}`}
      className="relative inline-flex items-center text-[#C2B5A5] transition-colors hover:text-[#F5F1EB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kurio-cream"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
      </svg>
      <span
        aria-hidden="true"
        className="absolute -top-1 -right-2 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#d28a4c] px-0.5 text-[9px] font-bold text-black"
      >
        {count > 99 ? '99+' : count}
      </span>
    </Link>
  )
}