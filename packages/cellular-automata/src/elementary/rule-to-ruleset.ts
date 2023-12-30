import { transcode } from 'transcoder'
import { binaryToBooleans } from '../octet/binary-to-booleans.js'

export function ruleToBinary(n: number): string {
  return transcode(n).toBinary()
}

export function ruleToBooleans(n: number): boolean[] {
  return binaryToBooleans(ruleToBinary(n))
}
