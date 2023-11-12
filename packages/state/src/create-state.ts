export type State<T> = {
  get: () => T
  set: (x: T) => void
}

export const createState: <T>(initial: T) => State<T> = function createState<T>(
  initial: T,
): State<T> {
  let state: T = initial
  return {
    get(): T {
      return state
    },
    set(x: T): void {
      state = x
    },
  }
}
