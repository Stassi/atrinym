import { pipe } from 'ramda-typed'
import {
  type ElementaryRuleEquivalences,
  elementaryRuleEquivalences,
} from './equivalences.js'
import {
  type ElementaryRuleSymmetriesParam,
  elementaryRuleSymmetries,
} from './symmetries.js'

export type ElementaryRule = ElementaryRuleEquivalences
export type ElementaryRuleParam = ElementaryRuleSymmetriesParam

export const elementaryRule: (x: ElementaryRuleParam) => ElementaryRule = pipe(
  elementaryRuleSymmetries,
  elementaryRuleEquivalences,
)
