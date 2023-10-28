import { curryAdd } from './curry-add.js'

const ONE = 1
export const decrement = curryAdd(-ONE)
export const increment = curryAdd(ONE)
