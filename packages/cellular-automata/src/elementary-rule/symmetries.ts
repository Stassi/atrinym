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

function decimalToBinary(n: number): string {
  return transcode(n).toBinary()
}

function decimalToBooleans(n: number): boolean[] {
  return binaryToBooleans(decimalToBinary(n))
}

function ruleToDecimal(x: ElementaryRuleSymmetriesParam): number {
  if (typeof x === 'number') return x
  return fromBinary(typeof x === 'string' ? x : booleansToBinary(x)).toNumber()
}

export const elementaryRuleSymmetries: (
  x: ElementaryRuleSymmetriesParam,
) => ElementaryRuleSymmetries = pipe(
  validateDomain,
  ruleToDecimal,
  applySpec({
    binary: decimalToBinary,
    booleans: decimalToBooleans,
    decimal: identity,
  }),
)
