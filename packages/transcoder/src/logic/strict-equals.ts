// TODO: Extract to `package:logic`
export function strictEquals<T>(x: T): (y: T) => boolean {
  return (y: T): boolean => x === y
}
