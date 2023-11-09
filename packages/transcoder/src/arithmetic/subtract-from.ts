// TODO: Merge with `package:arithmetic`
import { add, negate } from 'arithmetic'

export function subtractFrom(minuend: number): (subtrahend: number) => number {
  return (subtrahend: number): number => add(minuend, negate(subtrahend))
}
