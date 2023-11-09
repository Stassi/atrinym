import { Buffer } from 'node:buffer'
import { strictEquals } from './logic/strict-equals.js'
import { toBinary as toBinaryOctet } from './octet/to-binary.js'
import { toDecimal as toDecimalOctet } from './octet/to-decimal.js'
import {
  decode as decodeNumber,
  encode as encodeNumber,
} from './transcode-number.js'

type BufferEncoding =
  | 'base64'
  | 'base64url'
  | 'hex'
  | 'latin1'
  | 'utf8'
  | 'utf16le'

export type BinaryStringEncoding = BufferEncoding | 'binary' | 'json'

export type BinaryTranscoder = {
  toArray: () => number[]
  toBase64: () => string
  toBase64URL: () => string
  toBinary: () => string
  toBuffer: () => Buffer
  toHex: () => string
  toJSON: () => string
  toLatin1: () => string
  toNumber: () => number
  toUInt8Array: () => Uint8Array
  toUTF8: () => string
  toUTF16LE: () => string
}

const BASE_64 = 'base64',
  BASE_64_URL = 'base64url',
  BINARY = 'binary',
  HEX = 'hex',
  JSON_STRING = 'json',
  LATIN_1 = 'latin1',
  UTF_8 = 'utf8',
  UTF_16_LE = 'utf16le',
  strictEqualsBinary: (x: string) => boolean = strictEquals(BINARY),
  strictEqualsJSON: (x: string) => boolean = strictEquals(JSON_STRING)

export function transcode(
  param:
    | Buffer
    | number
    | number[]
    | Uint8Array
    | { encoding: BinaryStringEncoding; text: string },
): BinaryTranscoder {
  const paramIsArray = Array.isArray(param),
    paramIsNumber = typeof param === 'number',
    paramIsString = !paramIsNumber && 'encoding' in param && 'text' in param,
    paramIsBinary = paramIsString && strictEqualsBinary(param.encoding),
    paramIsJSON = paramIsString && strictEqualsJSON(param.encoding),
    toUInt8Array = (): Uint8Array => {
      if (paramIsNumber) return encodeNumber(param)
      if (paramIsBinary) return encodeNumber(toDecimalOctet(param.text))
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- unsafe `any` return type specified by MDN
      if (paramIsJSON) return Buffer.from(JSON.parse(param.text))
      if (paramIsArray) return Uint8Array.from(param)
      if (paramIsString)
        return Uint8Array.from(
          Buffer.from(param.text, param.encoding as BufferEncoding),
        )
      return param
    },
    toNumber = (): number => decodeNumber(toUInt8Array()),
    toString = (targetEncoding: BufferEncoding) => (): string =>
      Buffer.from(toUInt8Array()).toString(targetEncoding)

  return {
    toArray(): number[] {
      return [...toUInt8Array()]
    },
    toBase64: toString(BASE_64),
    toBase64URL: toString(BASE_64_URL),
    toBinary(): string {
      return toBinaryOctet(toNumber())
    },
    toBuffer(): Buffer {
      return Buffer.from(toUInt8Array())
    },
    toHex: toString(HEX),
    toJSON(): string {
      return JSON.stringify(Buffer.from(toUInt8Array()))
    },
    toLatin1: toString(LATIN_1),
    toNumber,
    toUInt8Array,
    toUTF16LE: toString(UTF_16_LE),
    toUTF8: toString(UTF_8),
  }
}

function fromString(encoding: BinaryStringEncoding) {
  return (text: string): BinaryTranscoder => transcode({ encoding, text })
}

export const fromBase64: (text: string) => BinaryTranscoder =
  fromString(BASE_64)

export const fromBase64URL: (text: string) => BinaryTranscoder =
  fromString(BASE_64_URL)

export const fromBinary: (text: string) => BinaryTranscoder = fromString(BINARY)

export const fromHex: (text: string) => BinaryTranscoder = fromString(HEX)

export const fromJSON: (text: string) => BinaryTranscoder =
  fromString(JSON_STRING)

export const fromLatin1: (text: string) => BinaryTranscoder =
  fromString(LATIN_1)
