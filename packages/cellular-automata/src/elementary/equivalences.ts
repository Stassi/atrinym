import {
  invertColorBinary,
  invertLeftRightBinary,
  invertColorAndLeftRightBinary,
} from './inversions.js'
import { rulesetToRule } from './ruleset-to-rule.js'
import { ruleToBinary } from './rule-to-ruleset.js'

function equivalencesFromInversionBinary(invert: (s: string) => string) {
  return (n: number): number => rulesetToRule(invert(ruleToBinary(n)))
}

export const invertColorEquivalentRule: (n: number) => number =
  equivalencesFromInversionBinary(invertColorBinary)

export const invertLeftRightEquivalentRule: (n: number) => number =
  equivalencesFromInversionBinary(invertLeftRightBinary)

export const invertColorAndLeftRightEquivalentRule: (n: number) => number =
  equivalencesFromInversionBinary(invertColorAndLeftRightBinary)
