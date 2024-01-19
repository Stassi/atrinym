// TODO: Replace `R.pipe` with native `conduit:pipe`
import { pipe } from 'ramda-typed'
import { type State, createState } from 'state'
import { length } from './length.js'
import {
  type BinaryCallback,
  type Sliceable,
  type SliceableCallback,
  slice,
} from './slice.js'

type Callback<T, U> = (x: T) => U

type Sliced<T> = Sliceable<T>[]

export function splitEvery<T>(
  width: number,
  collection: Sliceable<T>,
): Sliced<T> {
  const head: SliceableCallback<T> = slice(0, width),
    tail: SliceableCallback<T> = slice(width, Infinity),
    { get: remaining, set: setRemaining }: State<Sliceable<T>> =
      createState(collection),
    { get: generated, update: updateGenerated } = createState(
      [],
    ) as unknown as State<Sliced<T>>

  while (length(remaining()) > 0) {
    ;[
      pipe(
        (x: Sliceable<T>): BinaryCallback<Sliced<T>> =>
          (prev: Sliced<T>): Sliced<T> => [...prev, head(x)],
        updateGenerated,
      ),
      pipe(tail, setRemaining),
    ].forEach((fn: Callback<Sliceable<T>, void>): void => {
      fn(remaining())
    })
  }

  return generated()
}
