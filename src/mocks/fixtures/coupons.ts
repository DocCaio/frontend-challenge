export interface CouponFixture {
  code: string
  description: string
  kind: 'percent' | 'fixed'
  value: string 
  expiresAt: string | null
}

export const coupons: CouponFixture[] = [
  {
    code: 'KURIO10',
    description: 'Desconto de lançamento de 10%',
    kind: 'percent',
    value: '10',
    expiresAt: null,
  },
  {
    code: 'BEMVINDO',
    description: 'Boas-vindas: 0.25 ETH de desconto',
    kind: 'fixed',
    value: '0.25',
    expiresAt: null,
  },
  {
    code: 'VERAO25',
    description: 'Promoção de verão de 25%',
    kind: 'percent',
    value: '25',
    expiresAt: '2026-08-31T23:59:59Z', 
  },
]