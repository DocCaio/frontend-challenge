import { cartHandlers } from './cart'
import { catalogHandlers } from './catalog'

export const handlers = [...catalogHandlers, ...cartHandlers]