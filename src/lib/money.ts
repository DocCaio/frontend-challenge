import Decimal from 'decimal.js'

export const eth = (value: string) => new Decimal(value)

export const formatEth = (value: string) =>
  `${new Decimal(value).toFixed(2)} ETH`