// TODO: Prefer native utility invariants
import { applySpec, identity, pipe } from 'ramda-typed'
import { fromBinary, transcode } from 'transcoder'
import { binaryToBooleans } from '../octet/binary-to-booleans.js'
import { booleansToBinary } from '../octet/booleans-to-binary.js'
import { validateDomain } from './validate-domain.js'

export type ElementaryRuleSymmetriesParam = boolean[] | number | string

export type ElementaryRuleSymmetries = {
  binary: string
  booleans: boolean[]
  decimal: number
}

function ruleToDecimal(x: ElementaryRuleSymmetriesParam): number {
  if (typeof x === 'number') return x
  return fromBinary(typeof x === 'string' ? x : booleansToBinary(x)).toNumber()
}

function decimalToBinary(n: number): string {
  return transcode(n).toBinary()
}

export const elementaryRuleSymmetries: (
  x: ElementaryRuleSymmetriesParam,
) => ElementaryRuleSymmetries = pipe(
  validateDomain,
  ruleToDecimal,
  applySpec({
    binary: decimalToBinary,
    booleans: pipe(decimalToBinary, binaryToBooleans),
    decimal: identity,
  }),
)
