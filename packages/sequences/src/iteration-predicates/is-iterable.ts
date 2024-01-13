import { strictEqualsFunction } from '../logic/strict-equals-function.js'

export type Iterable<T> = { [Symbol.iterator]: () => Iterable<T> }

export function isIterable<T>(x: Iterable<T>): x is Iterable<T> {
  return (
    strictEqualsFunction(typeof x[Symbol.iterator]) &&
    x === x[Symbol.iterator]()
  )
}
