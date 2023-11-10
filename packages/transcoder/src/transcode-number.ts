import { Buffer } from 'node:buffer'
import { length } from 'sequences'
import { subdivide as subdivideOctets } from './octet/subdivide.js'
import { toBinary } from './octet/to-binary.js'
import { toDecimal } from './octet/to-decimal.js'

export function decode(encoded: Uint8Array): number {
  return Buffer.from(encoded).readUIntBE(0, length(encoded))
}

export function encode(n: number): Uint8Array {
  const binary: string = toBinary(n)
  const decimal: number[] = subdivideOctets(binary).map(toDecimal)
  return Uint8Array.from(decimal)
}
