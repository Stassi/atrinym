// TODO: Prefer native utility invariants
import { applySpec, identity, pipe } from 'ramda-typed'
import { length } from 'sequences'
import { fromBinary, transcode } from 'transcoder'
import { binaryToBooleans } from '../octet/binary-to-booleans.js'
import { booleansToBinary } from '../octet/booleans-to-binary.js'
import { not } from '../logic/not.js'
import { strictEquals } from '../logic/strict-equals.js'

export type ElementaryRuleSymmetriesParam = boolean[] | number | string

export type ElementaryRuleSymmetries = {
  binary: string
  booleans: boolean[]
  decimal: number
}

const strictEqualsEight: (n: number) => boolean = strictEquals(8)

function validateDomain(
  x: ElementaryRuleSymmetriesParam,
): ElementaryRuleSymmetriesParam {
  if (typeof x === 'number') {
    if (x < 0 || x > 255)
      throw new RangeError('Decimal octet must be in range: [0, 256)')
  } else if (not(strictEqualsEight(length(x))))
    throw new RangeError('Octet length must equal 8')
  return x
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
