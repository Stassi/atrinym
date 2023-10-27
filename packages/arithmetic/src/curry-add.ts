import { add } from './add.js'

export function curryAdd(x: number): (y: number) => number {
  return (y: number): number => add(x, y)
}
