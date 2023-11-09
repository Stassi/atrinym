import { Buffer } from 'node:buffer'
import { entable } from '../../arrays/entable.js'
import { toNumbers } from '../to-numbers.js'

export function interfuse16(x: Uint8Array): Uint16Array {
  return Uint16Array.from(
    entable({ data: toNumbers(x), width: 2 }).map((y: number[]): number =>
      Buffer.from(y).readUInt16BE(),
    ),
  )
}

export function interfuse32(x: Uint8Array): Uint32Array {
  return Uint32Array.from(
    entable({ data: toNumbers(x), width: 4 }).map((y: number[]): number =>
      Buffer.from(y).readUInt32BE(),
    ),
  )
}

export function interfuse64(x: Uint8Array): BigUint64Array {
  return BigUint64Array.from(
    entable({ data: toNumbers(x), width: 8 }).map((y: number[]): bigint =>
      Buffer.from(y).readBigUint64BE(),
    ),
  )
}
