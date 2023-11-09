export function createState<T>(initial: T): {
  get: () => T
  set: (x: T) => void
} {
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
