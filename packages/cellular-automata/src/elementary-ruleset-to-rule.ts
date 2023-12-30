import { fromBinary } from 'transcoder'
import { booleansToBinary } from './octet/booleans-to-binary.js'

export function rulesetToRule(x: boolean[] | string): number {
  return fromBinary(typeof x === 'string' ? x : booleansToBinary(x)).toNumber()
}
