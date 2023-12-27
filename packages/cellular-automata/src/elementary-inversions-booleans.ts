import { reverse } from './sequences/reverse.js'

export function invertColor(x: boolean[]): boolean[] {
  return reverse(x).map((y: boolean): boolean => !y)
}

// TODO: Replace with two piped swaps [(1, 4), (3, 6)] in a new general binary index swap function (package:sequences)
export function invertLeftRight(x: boolean[]): boolean[] {
  return [x[0], x[4], x[2], x[6], x[1], x[5], x[3], x[7]] as boolean[]
}

export function invertColorAndLeftRight(x: boolean[]): boolean[] {
  return invertLeftRight(invertColor(x))
}
