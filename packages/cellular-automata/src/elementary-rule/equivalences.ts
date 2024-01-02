// TODO: Prefer native utility invariants
import { applySpec, map, pipe, prop, swap } from 'ramda-typed'
import { not } from '../logic/not.js'
import { reverse } from '../sequences/reverse.js'
import {
  type ElementaryRuleSymmetries,
  type ElementaryRuleSymmetriesParam,
  elementaryRuleSymmetries,
} from './symmetries.js'

type BinaryCallback<T> = (x: T) => T
type BooleanCallback = BinaryCallback<boolean[]>

export type ElementaryRuleEquivalences = Record<
  'complemented' | 'complementedAndReflected' | 'reflected',
  ElementaryRuleSymmetries
>

const complement: BooleanCallback = pipe(reverse, map(not)),
  reflect: BooleanCallback = pipe(swap(1, 4), swap(3, 6))

export const elementaryRuleEquivalences: (
  x: ElementaryRuleSymmetriesParam,
) => ElementaryRuleEquivalences = pipe(
  elementaryRuleSymmetries,
  prop('booleans'),
  // @ts-expect-error -- valid type
  applySpec({
    complemented: complement,
    complementedAndReflected: pipe(complement, reflect),
    reflected: reflect,
  }),
  map(elementaryRuleSymmetries),
)
