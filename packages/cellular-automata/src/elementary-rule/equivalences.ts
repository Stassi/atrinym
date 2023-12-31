// TODO: Prefer native utility invariants
import { applySpec, map, pipe, prop } from 'ramda-typed'
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

// TODO: Replace with two piped swaps [(1, 4), (3, 6)] in a new general binary index swap function (package:sequences)
function reflect(x: boolean[]): boolean[] {
  return [x[0], x[4], x[2], x[6], x[1], x[5], x[3], x[7]] as boolean[]
}

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
