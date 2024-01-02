// TODO: Prefer native utility invariants
import { applySpec, map, pipe, prop, swap } from 'ramda-typed'
import { not } from '../logic/not.js'
import { reverse } from '../sequences/reverse.js'
import {
  type ElementaryRuleSymmetries,
  type ElementaryRuleSymmetriesParam,
  elementaryRuleSymmetries,
} from './symmetries.js'

export type ElementaryRuleEquivalences = Record<
  'complemented' | 'complementedAndReflected' | 'reflected',
  ElementaryRuleSymmetries
>

function complement(x: boolean[]): boolean[] {
  return reverse(x).map(not)
}

const reflect: (x: boolean[]) => boolean[] = pipe(swap(1, 4), swap(3, 6))

const equivalences: (x: boolean[]) => ElementaryRuleEquivalences = pipe(
  // @ts-expect-error -- valid type
  applySpec({
    complemented: complement,
    complementedAndReflected: pipe(complement, reflect),
    reflected: reflect,
  }),
  map(elementaryRuleSymmetries),
)

export const elementaryRuleEquivalences: (
  x: ElementaryRuleSymmetriesParam,
) => ElementaryRuleEquivalences = pipe(
  elementaryRuleSymmetries,
  prop('booleans'),
  equivalences,
)
