import { length } from 'sequences'
import { transcode, fromBinary } from 'transcoder'
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

function complement(x: boolean[]): boolean[] {
  return reverse(x).map((y: boolean): boolean => !y)
}

// TODO: Replace with two piped swaps [(1, 4), (3, 6)] in a new general binary index swap function (package:sequences)
function reflect(x: boolean[]): boolean[] {
  return [x[0], x[4], x[2], x[6], x[1], x[5], x[3], x[7]] as boolean[]
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

  // TODO: Reduce duplication in equivalencesFromInversionBinary(binaryInversionFromBooleansInversion(...)) & simplify

  return {
    complement(): ElementaryRule {
      const complementRule: (n: number) => number =
        equivalencesFromInversionBinary(
          binaryInversionFromBooleansInversion(complement),
        )

      if (typeof x === 'number') return elementaryRule(complementRule(x))
      return elementaryRule(complementRule(rulesetToRule(x)))
    },
    complementAndReflect(): ElementaryRule {
      // TODO: Remove and replace with chained method calls

      function complementAndReflect(y: boolean[]): boolean[] {
        // noinspection JSSuspiciousNameCombination
        return reflect(complement(y))
      }

      const complementAndReflectRule: (n: number) => number =
        equivalencesFromInversionBinary(
          binaryInversionFromBooleansInversion(complementAndReflect),
        )

      if (typeof x === 'number')
        return elementaryRule(complementAndReflectRule(x))
      return elementaryRule(complementAndReflectRule(rulesetToRule(x)))
    },
    reflect(): ElementaryRule {
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
