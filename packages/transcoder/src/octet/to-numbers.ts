export function toNumbers(x: ArrayBuffer): number[] {
  return [...new Uint8Array(x)]
}
