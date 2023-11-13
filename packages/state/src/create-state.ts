export type State<T> = {
  get: () => T
  reset: () => void
  set: (x: T) => void
  update: (x: (previous: T) => T) => void
}

export const createState: <T>(initial: T) => State<T> = function createState<T>(
  initial: T,
): State<T> {
  let state: T = initial
  return {
    get(): T {
      return state
    },
    reset(): void {
      state = initial
    },
    set(x: T): void {
      state = x
    },
    update(fn: (previous: T) => T): void {
      state = fn(state)
    },
  }
}
