import { length } from 'sequences'
import { strictEquals } from '../logic/strict-equals.js'
import { not } from '../logic/not.js'
import { type ElementaryRuleSymmetriesParam } from './symmetries.js'

const strictEqualsEight: (n: number) => boolean = strictEquals(8)

export function validateDomain(
  x: ElementaryRuleSymmetriesParam,
): ElementaryRuleSymmetriesParam {
  if (typeof x === 'number') {
    if (x < 0 || x > 255)
      throw new RangeError('Decimal octet must be in range: [0, 256)')
  } else if (not(strictEqualsEight(length(x))))
    throw new RangeError('Octet length must equal 8')
  return x
}
