import { length } from 'sequences'
import { fromBinary, transcode } from 'transcoder'
import { binaryToBooleans } from './octet/binary-to-booleans.js'
import { booleansToBinary } from './octet/booleans-to-binary.js'
import { not } from './logic/not.js'
import { reverse } from './sequences/reverse.js'
import { strictEquals } from './logic/strict-equals.js'

type NumberCallback = (n: number) => number

export type ElementaryRule = {
  complement: () => ElementaryRule
  complementAndReflect: () => ElementaryRule
  decimal: number
  reflect: () => ElementaryRule
  toBinary: () => string
  toBooleans: () => boolean[]
  toDecimal: () => number
}

function ruleToBinary(n: number): string {
  return transcode(n).toBinary()
}

function ruleToBooleans(n: number): boolean[] {
  return binaryToBooleans(ruleToBinary(n))
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
  return (n: number): number => ruleToDecimal(invert(ruleToBinary(n)))
}

const strictEqualsEight: (n: number) => boolean = strictEquals(8)

export function elementaryRule(x: boolean[] | number | string): ElementaryRule {
  if (typeof x === 'number') {
    if (x < 0 || x > 255)
      throw new RangeError('Decimal octet must be in range: [0, 256)')
  } else if (not(strictEqualsEight(length(x))))
    throw new RangeError('Octet length must equal 8')

  const decimal: number = ruleToDecimal(x)

  function complement(): ElementaryRule {
    function complementBooleans(z: boolean[]): boolean[] {
      return reverse(z).map(not)
    }

    const complementDecimal: NumberCallback = equivalencesFromInversionBinary(
      binaryInversionFromBooleansInversion(complementBooleans),
    )

    return elementaryRule(complementDecimal(decimal))
  }

  function reflect(): ElementaryRule {
    function reflectBooleans(y: boolean[]): boolean[] {
      // TODO: Replace with two piped swaps [(1, 4), (3, 6)] in a new general binary index swap function (package:sequences)
      return [y[0], y[4], y[2], y[6], y[1], y[5], y[3], y[7]] as boolean[]
    }

    const reflectDecimal: NumberCallback = equivalencesFromInversionBinary(
      binaryInversionFromBooleansInversion(reflectBooleans),
    )

    return elementaryRule(reflectDecimal(decimal))
  }

  return {
    // TODO: Combine the equivalence method outputs as a static object
    complement,
    complementAndReflect(): ElementaryRule {
      return complement().reflect()
    },
    decimal,
    reflect,
    // TODO: Combine the symmetrical method outputs as a static object
    toBinary(): string {
      return ruleToBinary(decimal)
    },
    toBooleans(): boolean[] {
      return ruleToBooleans(decimal)
    },
    toDecimal(): number {
      return decimal
    },
  }
}
