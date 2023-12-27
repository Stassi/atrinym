import { length } from 'sequences'
import { fromBinary } from 'transcoder'
import { booleansToBinary } from './octet/booleans-to-binary.js'

export function elementaryRule(x: boolean[] | string): number {
  if (length(x) !== 8) throw new RangeError('Octet input length must be 8.')

  return fromBinary(typeof x === 'string' ? x : booleansToBinary(x)).toNumber()
}
