import { createState, type State } from 'state'
import { length } from './length.js'
import { slice, type Sliceable } from './slice.js'

type Sliced<T> = Sliceable<T>[]

export function splitEvery<T>(
  width: number,
  collection: Sliceable<T>,
): Sliced<T> {
  const { get: remaining, set: setRemaining }: State<Sliceable<T>> =
      createState(collection),
    { get: generated, update: updateGenerated } = createState(
      [],
    ) as unknown as State<Sliced<T>>

  while (length(remaining()) > 0) {
    updateGenerated(
      (prev: Sliced<T>): Sliced<T> => [...prev, slice(0, width, remaining())],
    )

    setRemaining(slice(width, Infinity, remaining()))
  }

  return generated()
}
