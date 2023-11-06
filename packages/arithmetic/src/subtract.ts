import { add } from './add.js'
import { negate } from './negate.js'

export function subtract(minuend: number, subtrahend: number): number {
  return add(minuend, negate(subtrahend))
}
