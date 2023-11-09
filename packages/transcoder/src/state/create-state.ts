export function createState<T>(state: T): {
  get: () => T
  set: (x: T) => void
} {
  return {
    get(): T {
      return state
    },
    set(x: T): void {
      // eslint-disable-next-line no-param-reassign -- featured mechanic
      state = x
    },
  }
}
