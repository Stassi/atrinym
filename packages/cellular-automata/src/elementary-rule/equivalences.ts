// TODO: Prefer native utility invariants
import { applySpec, identity, map, pipe, prop, swap } from 'ramda-typed'
import { not } from '../logic/not.js'
import { reverse } from '../sequences/reverse.js'
import {
  type ElementaryRuleSymmetries,
  elementaryRuleSymmetries,
} from './symmetries.js'

type BinaryCallback<T> = (x: T) => T
type BooleansCallback = BinaryCallback<boolean[]>

export type ElementaryRuleEquivalences = Record<
  'complemented' | 'complementedAndReflected' | 'reflected' | 'rule',
  ElementaryRuleSymmetries
>

const complement: BooleansCallback = pipe(reverse, map(not)),
  reflect: BooleansCallback = pipe(swap(1, 4), swap(3, 6))

export const elementaryRuleEquivalences: (
  x: ElementaryRuleSymmetries,
) => ElementaryRuleEquivalences = pipe(
  prop('booleans'),
  // @ts-expect-error -- valid type
  applySpec({
    complemented: complement,
    complementedAndReflected: pipe(complement, reflect),
    reflected: reflect,
    rule: identity,
  }),
  map(elementaryRuleSymmetries),
)
