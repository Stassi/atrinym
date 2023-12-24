import { transcode } from 'transcoder'
import { strictEquals } from './logic/strict-equals.js'

const strictEqualsOne: (x: string) => boolean = strictEquals('1')

export function elementaryRuleset(n: number): boolean[] {
  if (n < 0)
    throw new RangeError(
      'Range underflow: Integer input must be equal to or greater than 0.',
    )
  else if (n > 255)
    throw new RangeError(
      'Range overflow: Integer input must be less than or equal to 255.',
    )

  return transcode(n).toBinary().split('').map(strictEqualsOne)
}
