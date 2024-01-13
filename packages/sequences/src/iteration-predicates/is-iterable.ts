import { strictEqualsFunction } from '../logic/strict-equals-function.js'

export type IterableNonNative<T> = {
  [Symbol.iterator]: () => IterableNonNative<T>
}

export function isIterable<T>(
  x: IterableNonNative<T>,
): x is IterableNonNative<T> {
  return (
    strictEqualsFunction(typeof x[Symbol.iterator]) &&
    x === x[Symbol.iterator]()
  )
}
