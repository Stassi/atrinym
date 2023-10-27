import { describe, expect, it } from '@jest/globals'
import { tupleAdd } from './tuple-add.js'

describe('tupleAdd(...)', (): void => {
  describe.each([
    {
      expected: -2,
      x: -1,
      y: -1,
    },
    {
      expected: 0,
      x: -1,
      y: 1,
    },
    {
      expected: 2,
      x: 1,
      y: 1,
    },
  ])(
    'inputs: $x, $y',
    ({
      expected,
      x,
      y,
    }: {
      expected: ReturnType<typeof tupleAdd>
      x: Parameters<typeof tupleAdd>[0][0]
      y: Parameters<typeof tupleAdd>[0][1]
    }): void => {
      it('should return the sum of both numbers', (): void => {
        expect(tupleAdd([x, y])).toStrictEqual(expected)
      })

      it('should be commutative', (): void => {
        expect(tupleAdd([y, x])).toStrictEqual(expected)
      })
    },
  )
})
