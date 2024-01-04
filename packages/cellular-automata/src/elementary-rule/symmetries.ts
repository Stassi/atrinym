// TODO: Prefer native utility invariants
import { applySpec, identity, pipe } from 'ramda-typed'
import { fromBinary, transcode } from 'transcoder'
import { binaryToBooleans } from '../octet/binary-to-booleans.js'
import { booleansToBinary } from '../octet/booleans-to-binary.js'
import { validateDomain } from './validate-domain.js'

export type ElementaryRuleSymmetriesPrimitives = boolean[] | number | string

export type ElementaryRuleSymmetries = {
  binary: string
  booleans: boolean[]
  decimal: number
}

export type ElementaryRuleSymmetriesParam =
  | ElementaryRuleSymmetries
  | ElementaryRuleSymmetriesPrimitives

function isElementaryRuleSymmetries(
  x: ElementaryRuleSymmetriesParam,
): x is ElementaryRuleSymmetries {
  return (
    typeof x === 'object' &&
    !Array.isArray(x) &&
    ['binary', 'booleans', 'decimal'].every((key: string): boolean =>
      Object.hasOwn(x, key),
    )
  )
}

function primitivesToDecimal(x: ElementaryRuleSymmetriesPrimitives): number {
  if (typeof x === 'number') return x
  return fromBinary(typeof x === 'string' ? x : booleansToBinary(x)).toNumber()
}

function decimalToBinary(n: number): string {
  return transcode(n).toBinary()
}

const primitivesToSymmetries: (
  x: ElementaryRuleSymmetriesPrimitives,
) => ElementaryRuleSymmetries = pipe(
  validateDomain,
  primitivesToDecimal,
  applySpec({
    binary: decimalToBinary,
    booleans: pipe(decimalToBinary, binaryToBooleans),
    decimal: identity,
  }),
)

export function elementaryRuleSymmetries(
  x: ElementaryRuleSymmetriesParam,
): ElementaryRuleSymmetries {
  return isElementaryRuleSymmetries(x) ? x : primitivesToSymmetries(x)
}
