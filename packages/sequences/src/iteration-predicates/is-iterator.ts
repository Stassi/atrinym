import { strictEqualsFunction } from '../logic/strict-equals-function.js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- implements official generic types
export function isIterator<T, TReturn = any, TNext = undefined>(
  x: Iterator<T, TReturn, TNext>,
): x is Iterator<T, TReturn, TNext> {
  return strictEqualsFunction(typeof x.next)
}
