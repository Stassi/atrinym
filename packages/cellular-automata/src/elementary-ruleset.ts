import { transcode } from 'transcoder'
import { strictEquals } from './logic/strict-equals.js'

const strictEqualsOne: (x: string) => boolean = strictEquals('1')

export function rulesetToBinary(n: number): string {
  if (n < 0)
    throw new RangeError(
      'Range underflow: Integer input must be equal to or greater than 0.',
    )
  else if (n > 255)
    throw new RangeError(
      'Range overflow: Integer input must be less than or equal to 255.',
    )

  return transcode(n).toBinary()
}

export function rulesetToBooleans(n: number): boolean[] {
  return rulesetToBinary(n).split('').map(strictEqualsOne)
}
