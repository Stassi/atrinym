import { type Sliceable } from '../slice.js'
import { type Sliced } from './declarative.js'

export function splitEveryImperative<T>(
  width: number,
  collection: Sliceable<T>,
): Sliced<T> {
  let i = 0
  const result: Sliced<T> = []

  while (i < collection.length) {
    result.push(collection.slice(i, i + width))
    i += width
  }

  return result
}
