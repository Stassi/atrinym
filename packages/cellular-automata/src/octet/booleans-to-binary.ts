// TODO: Extract to `package:octet`
export function booleansToBinary(x: boolean[]): string {
  return x.map((y: boolean): string => (y ? '1' : '0')).join('')
}
