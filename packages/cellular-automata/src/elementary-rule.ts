// TODO: Prefer native utility invariants
import { applySpec, identity, pipe } from 'ramda-typed'
import { length } from 'sequences'
import { fromBinary, transcode } from 'transcoder'
import { binaryToBooleans } from './octet/binary-to-booleans.js'
import { booleansToBinary } from './octet/booleans-to-binary.js'
import { not } from './logic/not.js'
import { reverse } from './sequences/reverse.js'
import { strictEquals } from './logic/strict-equals.js'

type NumberCallback = (x: number) => number

type ElementaryRuleParam = boolean[] | number | string

export type ElementaryRule = {
  binary: string
  booleans: boolean[]
  complemented: number
  complementedAndReflected: number
  decimal: number
  reflected: number
}

const strictEqualsEight: (n: number) => boolean = strictEquals(8)

function validateDomain(x: ElementaryRuleParam): ElementaryRuleParam {
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

function ruleToDecimal(x: ElementaryRuleParam): number {
  if (typeof x === 'number') return x
  return fromBinary(typeof x === 'string' ? x : booleansToBinary(x)).toNumber()
}

// TODO: Rename function
function binaryInversionFromBooleansInversion(
  invertBooleans: (x: boolean[]) => boolean[],
) {
  return (s: string): string =>
    booleansToBinary(invertBooleans(binaryToBooleans(s)))
}

// TODO: Rename function
function equivalencesFromInversionBinary(invert: (s: string) => string) {
  return (n: number): number => ruleToDecimal(invert(decimalToBinary(n)))
}

function complementBooleans(x: boolean[]): boolean[] {
  return reverse(x).map(not)
}

// TODO: Replace with two piped swaps [(1, 4), (3, 6)] in a new general binary index swap function (package:sequences)
function reflectBooleans(x: boolean[]): boolean[] {
  return [x[0], x[4], x[2], x[6], x[1], x[5], x[3], x[7]] as boolean[]
}

// TODO: Simplify & reduce duplication between equivalence transformations
const complement: NumberCallback = equivalencesFromInversionBinary(
  binaryInversionFromBooleansInversion(complementBooleans),
)

// TODO: Simplify & reduce duplication between equivalence transformations
const reflect: NumberCallback = equivalencesFromInversionBinary(
  binaryInversionFromBooleansInversion(reflectBooleans),
)

const complementAndReflect: NumberCallback = pipe(complement, reflect)

export const elementaryRule: (x: ElementaryRuleParam) => ElementaryRule = pipe(
  validateDomain,
  ruleToDecimal,
  // TODO: Decouple equivalences as new object, spread result
  applySpec({
    binary: decimalToBinary,
    booleans: decimalToBooleans,
    complemented: complement,
    complementedAndReflected: complementAndReflect,
    decimal: identity,
    reflected: reflect,
  }),
)
