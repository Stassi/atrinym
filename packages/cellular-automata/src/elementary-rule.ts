import { length } from 'sequences'
import {
  invertColorAndLeftRightEquivalentRule,
  invertColorEquivalentRule,
  invertLeftRightEquivalentRule,
} from './elementary-equivalences.js'
import { rulesetToRule } from './elementary-ruleset-to-rule.js'
import { ruleToBinary, ruleToBooleans } from './elementary-rule-to-ruleset.js'
import { strictEquals } from './logic/strict-equals.js'

export type ElementaryRule = {
  complement: () => number
  complementAndReflect: () => number
  reflect: () => number
  toBinary: () => string
  toBooleans: () => boolean[]
  toDecimal: () => number
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
      if (typeof x === 'number') return invertColorEquivalentRule(x)
      return invertColorEquivalentRule(rulesetToRule(x))
    },
    complementAndReflect(): number {
      if (typeof x === 'number') return invertColorAndLeftRightEquivalentRule(x)
      return invertColorAndLeftRightEquivalentRule(rulesetToRule(x))
    },
    reflect(): number {
      if (typeof x === 'number') return invertLeftRightEquivalentRule(x)
      return invertLeftRightEquivalentRule(rulesetToRule(x))
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
