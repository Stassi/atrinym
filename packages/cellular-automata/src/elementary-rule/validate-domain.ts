// TODO: Prefer native utility invariants
import { pipe } from 'ramda-typed'
import { length } from 'sequences'
import { not } from '../logic/not.js'
import { strictEquals } from '../logic/strict-equals.js'
import { type ElementaryRuleSymmetriesPrimitives } from './symmetries.js'

const invalidOctetLength: (
  x: Exclude<ElementaryRuleSymmetriesPrimitives, number>,
) => boolean = pipe(length, strictEquals(8), not)

export function validateDomain(
  x: ElementaryRuleSymmetriesPrimitives,
): ElementaryRuleSymmetriesPrimitives {
  if (typeof x === 'number') {
    if (x < 0 || x > 255)
      throw new RangeError('Decimal octet must be in range: [0, 256)')
  } else if (invalidOctetLength(x))
    throw new RangeError('Octet length must equal 8')
  return x
}
