import { useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'

const route = getRouteApi('/')
const STEP = 0.01

const fmt = (n: number) => n.toFixed(2).replace('.', ',')

interface Props {
  bounds: { min: string; max: string }
}

export default function PriceFilter({ bounds }: Props) {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  const lo = Number(bounds.min)
  const hi = Number(bounds.max)

  const [min, setMin] = useState(Number(search.minPrice ?? bounds.min))
  const [max, setMax] = useState(Number(search.maxPrice ?? bounds.max))

  const pct = (v: number) => (hi === lo ? 0 : ((v - lo) / (hi - lo)) * 100)
  const atBound = (a: number, b: number) => Math.abs(a - b) < STEP / 2

  const apply = () =>
    navigate({
      search: (prev) => ({
        ...prev,

        minPrice: atBound(min, lo) ? undefined : min.toFixed(2),
        maxPrice: atBound(max, hi) ? undefined : max.toFixed(2),
        page: 1,
      }),
    })

  return (
    <div>
      <div className="dual-range relative h-5">
        
        <div className="absolute inset-x-2 top-1/2 h-[3px] -translate-y-1/2 rounded bg-kurio-accent/40" />
        <div className="absolute inset-x-2 top-1/2 h-[3px] -translate-y-1/2">
          <div
            className="absolute h-full rounded bg-kurio-accent"
            style={{ left: `${pct(min)}%`, width: `${pct(max) - pct(min)}%` }}
          />
        </div>

        <input
          type="range"
          aria-label="Preço mínimo em ETH"
          min={lo}
          max={hi}
          step={STEP}
          value={min}
          
          style={{ zIndex: min > lo + (hi - lo) / 2 ? 4 : 3 }}
          onChange={(e) => setMin(Math.min(Number(e.target.value), max - STEP))}
        />
        <input
          type="range"
          aria-label="Preço máximo em ETH"
          min={lo}
          max={hi}
          step={STEP}
          value={max}
          style={{ zIndex: 3 }}
          onChange={(e) => setMax(Math.max(Number(e.target.value), min + STEP))}
        />
      </div>

      <p className="mt-3 text-xs text-kurio-sand">
        Preço: {fmt(min)} - {fmt(max)} ETH
      </p>

      <button
        type="button"
        onClick={apply}
        className="mt-3 rounded-lg bg-kurio-accent px-4 py-1.5 text-sm font-bold text-kurio-bg transition-colors hover:bg-kurio-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kurio-cream"
      >
        Aplicar
      </button>
    </div>
  )
}