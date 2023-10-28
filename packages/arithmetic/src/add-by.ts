import { add } from './add.js'

export function addBy(x: number): (y: number) => number {
  return (y: number): number => add(x, y)
}
