import { length } from 'sequences'
import { pipe } from 'ramda-typed'
import { not } from '../logic/not.js'
import { strictEquals } from '../logic/strict-equals.js'
import { type ElementaryRuleSymmetriesParam } from './symmetries.js'

const invalidOctetLength: (
  x: Exclude<ElementaryRuleSymmetriesParam, number>,
) => boolean = pipe(length, strictEquals(8), not)

export function validateDomain(
  x: ElementaryRuleSymmetriesParam,
): ElementaryRuleSymmetriesParam {
  if (typeof x === 'number') {
    if (x < 0 || x > 255)
      throw new RangeError('Decimal octet must be in range: [0, 256)')
  } else if (invalidOctetLength(x))
    throw new RangeError('Octet length must equal 8')
  return x
}
