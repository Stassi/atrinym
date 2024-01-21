// TODO: Replace `R.pipe` with native `conduit:pipe`
import { pipe } from 'ramda-typed'
import { createState, type State } from 'state'
import { length } from './length.js'
import { slice, type Sliceable, type SliceableCallback } from './slice.js'

type Callback<T, U> = (x: T) => U

type Sliced<T> = Sliceable<T>[]

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

function splitEveryDeclarative<T>(
  width: number,
  collection: Sliceable<T>,
): Sliced<T> {
  const head: SliceableCallback<T> = slice(0, width),
    tail: SliceableCallback<T> = slice(width, Infinity),
    { get: remaining, set: setRemaining }: State<Sliceable<T>> =
      createState(collection),
    { get: generated, update: updateGenerated } = createState(
      [],
    ) as unknown as State<Sliced<T>>,
    setTailAsRemaining: Callback<Sliceable<T>, void> = pipe(tail, setRemaining),
    iterate = (chunk: Sliceable<T>): void => {
      updateGenerated((prev: Sliced<T>): Sliced<T> => [...prev, head(chunk)])
      setTailAsRemaining(chunk)
    }

  while (length(remaining()) > 0) iterate(remaining())

  return generated()
}

export const splitEvery: <T>(
  width: number,
  collection: Sliceable<T>,
) => Sliced<T> = splitEveryDeclarative
