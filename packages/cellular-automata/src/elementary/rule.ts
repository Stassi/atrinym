import { length } from 'sequences'
import { strictEquals } from '../logic/strict-equals.js'
import { rulesetToRule } from './ruleset-to-rule.js'
import { ruleToBinary, ruleToBooleans } from './rule-to-ruleset.js'
import {
  invertColorAndLeftRightBinary,
  invertColorBinary,
  invertLeftRightBinary,
} from './inversions.js'

export type ElementaryRule = {
  complement: () => number
  complementAndReflect: () => number
  reflect: () => number
  toBinary: () => string
  toBooleans: () => boolean[]
  toDecimal: () => number
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

  return {
    complement(): number {
      const complementRule: (n: number) => number =
        equivalencesFromInversionBinary(invertColorBinary)

      if (typeof x === 'number') return complementRule(x)
      return complementRule(rulesetToRule(x))
    },
    complementAndReflect(): number {
      const complementAndReflectRule: (n: number) => number =
        equivalencesFromInversionBinary(invertColorAndLeftRightBinary)

      if (typeof x === 'number') return complementAndReflectRule(x)
      return complementAndReflectRule(rulesetToRule(x))
    },
    reflect(): number {
      const reflectRule: (n: number) => number =
        equivalencesFromInversionBinary(invertLeftRightBinary)

      if (typeof x === 'number') return reflectRule(x)
      return reflectRule(rulesetToRule(x))
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
