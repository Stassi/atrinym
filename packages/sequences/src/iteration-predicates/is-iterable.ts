import { strictEqualsFunction } from '../logic/strict-equals-function.js'

export function isIterable<T>(x: Iterable<T>): x is Iterable<T> {
  return (
    strictEqualsFunction(typeof x[Symbol.iterator]) &&
    (x as unknown as Iterator<T>) === x[Symbol.iterator]()
  )
}
