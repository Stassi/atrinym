import { length } from 'sequences'
import { fromBinary, transcode } from 'transcoder'
import { reverse } from './sequences/reverse.js'
import { strictEquals } from './logic/strict-equals.js'
import { booleansToBinary } from './octet/booleans-to-binary.js'
import { binaryToBooleans } from './octet/binary-to-booleans.js'

export type ElementaryRule = {
  complement: () => ElementaryRule
  complementAndReflect: () => ElementaryRule
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

function rulesetToRule(x: boolean[] | string): number {
  return fromBinary(typeof x === 'string' ? x : booleansToBinary(x)).toNumber()
}

function binaryInversionFromBooleansInversion(
  invertBooleans: (x: boolean[]) => boolean[],
) {
  return (s: string): string =>
    booleansToBinary(invertBooleans(binaryToBooleans(s)))
}

function equivalencesFromInversionBinary(invert: (s: string) => string) {
  return (n: number): number => rulesetToRule(invert(ruleToBinary(n)))
}

const strictEqualsEight: (n: number) => boolean = strictEquals(8)

export function elementaryRule(x: boolean[] | number | string): ElementaryRule {
  if (typeof x === 'number') {
    if (x < 0 || x > 255)
      throw new RangeError('Decimal octet must be in range: [0, 256)')
  } else if (!strictEqualsEight(length(x)))
    throw new RangeError('Octet length must equal 8')

  function innerComplement(): ElementaryRule {
    function complement(z: boolean[]): boolean[] {
      return reverse(z).map((y: boolean): boolean => !y)
    }

    // TODO: Reduce duplication in equivalencesFromInversionBinary(binaryInversionFromBooleansInversion(...)) & simplify

    const complementRule: (n: number) => number =
      equivalencesFromInversionBinary(
        binaryInversionFromBooleansInversion(complement),
      )

    if (typeof x === 'number') return elementaryRule(complementRule(x))
    return elementaryRule(complementRule(rulesetToRule(x)))
  }

  return {
    complement: innerComplement,
    complementAndReflect(): ElementaryRule {
      return innerComplement().reflect()
    },
    reflect(): ElementaryRule {
      // TODO: Replace with two piped swaps [(1, 4), (3, 6)] in a new general binary index swap function (package:sequences)
      function reflect(y: boolean[]): boolean[] {
        return [y[0], y[4], y[2], y[6], y[1], y[5], y[3], y[7]] as boolean[]
      }

      const reflectRule: (n: number) => number =
        equivalencesFromInversionBinary(
          binaryInversionFromBooleansInversion(reflect),
        )

      if (typeof x === 'number') return elementaryRule(reflectRule(x))
      return elementaryRule(reflectRule(rulesetToRule(x)))
    },
    toBinary(): string {
      if (typeof x === 'number') return ruleToBinary(x)
      return ruleToBinary(rulesetToRule(x))
    },
    toBooleans(): boolean[] {
      if (typeof x === 'number') return ruleToBooleans(x)
      return ruleToBooleans(rulesetToRule(x))
    },
    toDecimal(): number {
      if (typeof x === 'number') return x
      return rulesetToRule(x)
    },
  }
}
