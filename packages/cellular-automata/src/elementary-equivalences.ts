import {
  invertColorBinary,
  invertLeftRightBinary,
  invertColorAndLeftRightBinary,
} from './elementary-inversions.js'
import { elementaryRule } from './elementary-rule.js'
import { rulesetToBinary } from './elementary-ruleset.js'

function equivalencesFromInversionBinary(invert: (s: string) => string) {
  return (n: number): number => elementaryRule(invert(rulesetToBinary(n)))
}

export const invertColorEquivalentRule: (n: number) => number =
  equivalencesFromInversionBinary(invertColorBinary)

export const invertLeftRightEquivalentRule: (n: number) => number =
  equivalencesFromInversionBinary(invertLeftRightBinary)

export const invertColorAndLeftRightEquivalentRule: (n: number) => number =
  equivalencesFromInversionBinary(invertColorAndLeftRightBinary)
