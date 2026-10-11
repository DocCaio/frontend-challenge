import { FaMinus, FaPlus, FaRegTrashCan } from 'react-icons/fa6'
import { formatEthExact } from '@/lib/money'
import type { CartItem } from '../types'

interface Props {
  items: CartItem[]
  onChangeQuantity: (item: CartItem, quantity: number) => void
  onRemove: (item: CartItem) => void
}

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kurio-cream'

const rowGrid = 'md:grid-cols-[minmax(0,1fr)_96px_120px_96px_40px] md:gap-x-4'

const stepButton = `flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-kurio-accent text-kurio-bg transition-colors hover:bg-kurio-accent-hover disabled:cursor-not-allowed disabled:opacity-40 ${focusRing}`

export default function CartTable({ items, onChangeQuantity, onRemove }: Props) {
  return (
    <div>
      
      <div
        aria-hidden="true"
        className={`hidden border-b border-kurio-gold/30 px-3 pb-2 text-xs font-bold text-kurio-cream md:grid ${rowGrid}`}
      >
        <span>NFTs</span>
        <span>Preço</span>
        <span>Edições</span>
        <span>Total</span>
        <span />
      </div>

      <ul className="mt-2 space-y-2">
        {items.map((item) => {
          const label = `${item.name} #${item.edition}`
          const atMax = item.quantity >= item.available

          return (
            <li
              key={item.nftId}
              className={`grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-3 rounded-lg bg-kurio-surface p-3 ${rowGrid}`}
            >
              <div className="col-span-3 flex min-w-0 items-center gap-3 md:col-span-1">
                <img
                  src={item.imageUrl}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-kurio-cream">{label}</p>
                  <p className="text-xs text-kurio-gold">ID do token: {item.tokenId}</p>
                  <p className="text-xs text-kurio-accent-hover md:hidden">
                    {formatEthExact(item.unitPrice)} por edição
                  </p>
                </div>
              </div>

              <p className="hidden text-sm font-bold text-kurio-accent-hover md:block">
                <span className="sr-only">Preço: </span>
                {formatEthExact(item.unitPrice)}
              </p>

              <div
                role="group"
                aria-label={`Quantidade de ${label}`}
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  aria-label={`Diminuir quantidade de ${label}`}
                  disabled={item.quantity <= 1}
                  onClick={() => onChangeQuantity(item, item.quantity - 1)}
                  className={stepButton}
                >
                  <FaMinus aria-hidden="true" className="h-2.5 w-2.5" />
                </button>

                <span aria-live="polite" className="min-w-5 text-center text-sm text-kurio-cream">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  aria-label={`Aumentar quantidade de ${label}`}
                  title={atMax ? 'Limite de edições disponíveis' : undefined}
                  disabled={atMax}
                  onClick={() => onChangeQuantity(item, item.quantity + 1)}
                  className={stepButton}
                >
                  <FaPlus aria-hidden="true" className="h-2.5 w-2.5" />
                </button>
              </div>

              <p className="justify-self-end text-sm font-bold text-kurio-accent-hover md:justify-self-start">
                <span className="sr-only">Total: </span>
                {formatEthExact(item.lineTotal)}
              </p>

              <button
                type="button"
                aria-label={`Remover ${label} do carrinho`}
                onClick={() => onRemove(item)}
                className={`flex h-9 w-9 cursor-pointer items-center justify-center justify-self-end rounded-md text-kurio-gold transition-colors hover:text-kurio-accent-hover ${focusRing}`}
              >
                <FaRegTrashCan aria-hidden="true" className="h-4 w-4" />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}