import {
  elementaryRuleEquivalences,
  type ElementaryRuleEquivalences,
} from './elementary-rule-equivalences.js'
import {
  elementaryRuleSymmetries,
  type ElementaryRuleSymmetries,
  type ElementaryRuleSymmetriesParam,
} from './elementary-rule-symmetries.js'

export type ElementaryRule = ElementaryRuleSymmetries & {
  equivalences: ElementaryRuleEquivalences
}

export function elementaryRule(
  x: ElementaryRuleSymmetriesParam,
): ElementaryRule {
  const symmetries: ElementaryRuleSymmetries = elementaryRuleSymmetries(x)

  return {
    ...symmetries,
    equivalences: elementaryRuleEquivalences(symmetries.decimal),
  }
}
