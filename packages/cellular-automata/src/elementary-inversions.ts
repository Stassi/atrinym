import { binaryToBooleans } from './octet/binary-to-booleans.js'
import { booleansToBinary } from './octet/booleans-to-binary.js'
import { reverse } from './sequences/reverse.js'

export function invertColorBooleans(x: boolean[]): boolean[] {
  return reverse(x).map((y: boolean): boolean => !y)
}

// TODO: Replace with two piped swaps [(1, 4), (3, 6)] in a new general binary index swap function (package:sequences)
export function invertLeftRightBooleans(x: boolean[]): boolean[] {
  return [x[0], x[4], x[2], x[6], x[1], x[5], x[3], x[7]] as boolean[]
}

export function invertColorAndLeftRightBooleans(x: boolean[]): boolean[] {
  return invertLeftRightBooleans(invertColorBooleans(x))
}

function binaryInversionFromBooleansInversion(
  invertBooleans: (x: boolean[]) => boolean[],
) {
  // noinspection JSSuspiciousNameCombination
  return (y: string): string =>
    booleansToBinary(invertBooleans(binaryToBooleans(y)))
}

export const invertColorBinary =
  binaryInversionFromBooleansInversion(invertColorBooleans)

export const invertLeftRightBinary = binaryInversionFromBooleansInversion(
  invertLeftRightBooleans,
)

export const invertColorAndLeftRightBinary =
  binaryInversionFromBooleansInversion(invertColorAndLeftRightBooleans)
