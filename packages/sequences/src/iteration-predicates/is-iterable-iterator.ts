/* eslint-disable @typescript-eslint/no-explicit-any -- implements official generic types */

import { type Iterable, isIterable } from './is-iterable.js'
import { isIterator } from './is-iterator.js'

export type IterableIterator<
  T,
  TReturn = any,
  TNext = undefined,
> = Iterable<T> & Iterator<T, TReturn, TNext>

export function isIterableIterator<T, TReturn = any, TNext = undefined>(
  x: IterableIterator<T, TReturn, TNext>,
): x is IterableIterator<T, TReturn, TNext> {
  return isIterator(x) && isIterable(x)
}
