import { add } from './add.js'

export function tupleAdd(param: [x: number, y: number]): number {
  return add(...param)
}
