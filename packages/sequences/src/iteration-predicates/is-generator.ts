import { strictEqualsFunction } from '../logic/strict-equals-function.js'
import { isIterableIterator } from './is-iterable-iterator.js'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any --
 * implements official generic types at https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-6.html
 */
export function isGenerator<T = unknown, TReturn = any, TNext = unknown>(
  x: Generator<T, TReturn, TNext>,
): x is Generator<T, TReturn, TNext> {
  return (
    isIterableIterator(x as IterableIterator<T>) &&
    strictEqualsFunction(typeof x.return) &&
    strictEqualsFunction(typeof x.throw)
  )
}
