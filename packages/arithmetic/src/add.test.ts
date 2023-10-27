import { describe, expect, it } from '@jest/globals'
import { add } from './add.js'

describe('add(...)', (): void => {
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
      expected: ReturnType<typeof add>
      x: Parameters<typeof add>[0]
      y: Parameters<typeof add>[1]
    }): void => {
      it('should return the sum of both numbers', (): void => {
        expect(add(x, y)).toStrictEqual(expected)
      })

      it('should be commutative', (): void => {
        // noinspection JSSuspiciousNameCombination
        expect(add(y, x)).toStrictEqual(expected)
      })
    },
  )
})
