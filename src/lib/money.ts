import Decimal from 'decimal.js'

export const eth = (value: string) => new Decimal(value)

export const formatEth = (value: string) =>
  `${new Decimal(value).toFixed(2)} ETH`


export function formatEthExact(value: string) {
  const [int, frac = ''] = new Decimal(value).toFixed(6).replace(/0+$/, '').split('.')
  return `${int}.${frac.padEnd(2, '0')} ETH`
}