import { length } from 'sequences'
import {
  invertColorAndLeftRightEquivalentRule,
  invertColorEquivalentRule,
  invertLeftRightEquivalentRule,
} from './elementary-equivalences.js'
import { elementaryRule } from './elementary-rule.js'
import { rulesetToBinary, rulesetToBooleans } from './elementary-ruleset.js'
import { strictEquals } from './logic/strict-equals.js'

type DebugElementaryRuleParam = boolean[] | number | string

export type DebugElementaryRule = {
  complement: () => number
  complementAndReflect: () => number
  reflect: () => number
  toBinary: () => string
  toBooleans: () => boolean[]
  toDecimal: () => number
}

const strictEqualsEight: (n: number) => boolean = strictEquals(8)

// TODO: Replace predecessor

export function debugElementaryRule(
  x: DebugElementaryRuleParam,
): DebugElementaryRule {
  if (typeof x === 'number') {
    if (x < 0 || x > 255)
      throw new RangeError('Decimal octet must be in range: [0, 256)')
  } else if (!strictEqualsEight(length(x)))
    throw new RangeError('Octet length must equal 8')

  return {
    complement(): number {
      if (typeof x === 'number') return invertColorEquivalentRule(x)
      return invertColorEquivalentRule(elementaryRule(x))
    },
    complementAndReflect(): number {
      if (typeof x === 'number') return invertColorAndLeftRightEquivalentRule(x)
      return invertColorAndLeftRightEquivalentRule(elementaryRule(x))
    },
    reflect(): number {
      if (typeof x === 'number') return invertLeftRightEquivalentRule(x)
      return invertLeftRightEquivalentRule(elementaryRule(x))
    },
    toBinary(): string {
      if (typeof x === 'number') return rulesetToBinary(x)
      return rulesetToBinary(elementaryRule(x))
    },
    toBooleans(): boolean[] {
      if (typeof x === 'number') return rulesetToBooleans(x)
      return rulesetToBooleans(elementaryRule(x))
    },
    toDecimal(): number {
      if (typeof x === 'number') return x
      return elementaryRule(x)
    },
  }
}
