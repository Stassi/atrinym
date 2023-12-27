import { strictEquals } from '../logic/strict-equals.js'

const strictEqualsOne: (x: string) => boolean = strictEquals('1')

// TODO: Extract to `package:octet`
export function binaryToBooleans(x: string): boolean[] {
  return x.split('').map(strictEqualsOne)
}
