import {
  elementaryRuleEquivalences,
  type ElementaryRuleEquivalences,
} from './elementary-rule-equivalences.js'
import {
  elementaryRuleSymmetries,
  type ElementaryRuleSymmetries,
  type ElementaryRuleSymmetriesParam,
} from './elementary-rule-symmetries.js'

export type ElementaryRule = ElementaryRuleEquivalences &
  ElementaryRuleSymmetries

export function elementaryRule(
  x: ElementaryRuleSymmetriesParam,
): ElementaryRule {
  const symmetries: ElementaryRuleSymmetries = elementaryRuleSymmetries(x)

  return {
    ...symmetries,
    // TODO: Accept ElementaryRuleSymmetries as parameter type (omit `.decimal` property)
    ...elementaryRuleEquivalences(symmetries.decimal),
  }
}
