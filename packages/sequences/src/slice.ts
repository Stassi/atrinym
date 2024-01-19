export type Sliceable<T> = T[] | string

// TODO: Test
export function slice<T>(
  start: number,
  end: number,
  collection: Sliceable<T>,
): Sliceable<T> {
  return collection.slice(start, end)
}
