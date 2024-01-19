export type BinaryCallback<T> = (x: T) => T
export type SliceableCallback<T> = BinaryCallback<Sliceable<T>>
export type Sliceable<T> = T[] | string

// TODO: Test module

export function sliceTernary<T>(
  start: number,
  end: number,
  collection: Sliceable<T>,
): Sliceable<T> {
  return collection.slice(start, end)
}

export function slice<T>(start: number, end: number): SliceableCallback<T> {
  return (x: Sliceable<T>): Sliceable<T> => sliceTernary(start, end, x)
}
