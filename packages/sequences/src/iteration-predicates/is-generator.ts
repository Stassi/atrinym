import { strictEqualsFunction } from '../logic/strict-equals-function.js'
import { isIterableIterator } from './is-iterable-iterator.js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- implements official generic types
export function isGenerator<T = unknown, TReturn = any, TNext = unknown>(
  x: Generator<T, TReturn, TNext>,
): x is Generator<T, TReturn, TNext> {
  return (
    isIterableIterator(x) &&
    strictEqualsFunction(typeof x.return) &&
    strictEqualsFunction(typeof x.throw)
  )
}
