import { addBy } from './add-by.js'
import { negate } from './negate.js'

const ONE = 1
export const decrement = addBy(negate(ONE))
export const increment = addBy(ONE)
