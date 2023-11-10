import { length } from 'sequences'

const OCTET_BITS = 8

export function subdivide(str: string): string[] {
  const stringLength: number = length(str)

  // TODO: Declarative replacement via subarrays
  const chunks: string[] = []

  for (let i = 0; i < stringLength; i += OCTET_BITS)
    chunks.push(str.substring(i, i + OCTET_BITS))

  return chunks
}
