import { isIterable } from './is-iterable.js'
import { isIterator } from './is-iterator.js'

export function isIterableIterator<T>(
  x: IterableIterator<T>,
): x is IterableIterator<T> {
  return isIterator(x) && isIterable(x)
}
