import { variadicPipe as pipe } from 'conduit'
import { createState, type State } from 'state'
import { length } from '../length.js'
import { type Sliceable, type SliceableCallback, slice } from '../slice.js'

export type Callback<T, U> = (x: T) => U

export type Sliced<T> = Sliceable<T>[]

export function splitEveryDeclarative<T>(
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
