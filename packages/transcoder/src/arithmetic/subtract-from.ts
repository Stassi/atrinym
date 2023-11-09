import { add } from './add.js'
import { negate } from './negate.js'

export function subtractFrom(minuend: number): (subtrahend: number) => number {
  return (subtrahend: number): number => add(minuend, negate(subtrahend))
}
