import { length } from 'sequences'
import { fromBinary, transcode } from 'transcoder'
import { binaryToBooleans } from './octet/binary-to-booleans.js'
import { booleansToBinary } from './octet/booleans-to-binary.js'
import { not } from './logic/not.js'
import { reverse } from './sequences/reverse.js'
import { strictEquals } from './logic/strict-equals.js'

type Callback<T> = (x: T) => T
type BooleansCallback = Callback<boolean[]>
type NumberCallback = Callback<number>

export type ElementaryRule = {
  binary: string
  booleans: boolean[]
  complement: () => number
  complementAndReflect: () => number
  decimal: number
  reflect: () => number
}

function decimalToBinary(n: number): string {
  return transcode(n).toBinary()
}

function decimalToBooleans(n: number): boolean[] {
  return binaryToBooleans(decimalToBinary(n))
}

function ruleToDecimal(x: boolean[] | number | string): number {
  if (typeof x === 'number') return x
  return fromBinary(typeof x === 'string' ? x : booleansToBinary(x)).toNumber()
}

// TODO: Rename function
function binaryInversionFromBooleansInversion(
  invertBooleans: (x: boolean[]) => boolean[],
) {
  return (s: string): string =>
    booleansToBinary(invertBooleans(binaryToBooleans(s)))
}

// TODO: Rename function
function equivalencesFromInversionBinary(invert: (s: string) => string) {
  return (n: number): number => ruleToDecimal(invert(decimalToBinary(n)))
}

const strictEqualsEight: (n: number) => boolean = strictEquals(8)

export function elementaryRule(x: boolean[] | number | string): ElementaryRule {
  if (typeof x === 'number') {
    if (x < 0 || x > 255)
      throw new RangeError('Decimal octet must be in range: [0, 256)')
  } else if (not(strictEqualsEight(length(x))))
    throw new RangeError('Octet length must equal 8')

  const decimal: number = ruleToDecimal(x),
    binary: string = decimalToBinary(decimal),
    booleans: boolean[] = decimalToBooleans(decimal)

  function complement(): number {
    const complementBooleans: BooleansCallback = (z: boolean[]): boolean[] =>
      reverse(z).map(not)

    const complementDecimal: NumberCallback = equivalencesFromInversionBinary(
      binaryInversionFromBooleansInversion(complementBooleans),
    )

    return complementDecimal(decimal)
  }

  function reflect(): number {
    // TODO: Replace with two piped swaps [(1, 4), (3, 6)] in a new general binary index swap function (package:sequences)
    const reflectBooleans: BooleansCallback = (y: boolean[]): boolean[] =>
      [y[0], y[4], y[2], y[6], y[1], y[5], y[3], y[7]] as boolean[]

    const reflectDecimal: NumberCallback = equivalencesFromInversionBinary(
      binaryInversionFromBooleansInversion(reflectBooleans),
    )

    return reflectDecimal(decimal)
  }

  return {
    binary,
    booleans,
    // TODO: Combine the equivalence method outputs as a static object
    complement,
    complementAndReflect(): number {
      return elementaryRule(complement()).reflect()
    },
    decimal,
    reflect,
  }
}
