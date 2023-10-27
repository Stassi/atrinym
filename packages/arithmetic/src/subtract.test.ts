import { describe, expect, it } from '@jest/globals'
import { subtract } from './subtract.js'

describe('subtract(...)', (): void => {
  describe.each([
    {
      expected: -1,
      minuend: -2,
      subtrahend: -1,
    },
    {
      expected: 2,
      minuend: 1,
      subtrahend: -1,
    },
    {
      expected: -2,
      minuend: -1,
      subtrahend: 1,
    },
    {
      expected: 1,
      minuend: 2,
      subtrahend: 1,
    },
  ])(
    'inputs: $minuend, $subtrahend',
    ({
      expected,
      minuend,
      subtrahend,
    }: {
      expected: ReturnType<typeof subtract>
      minuend: Parameters<typeof subtract>[0]
      subtrahend: Parameters<typeof subtract>[1]
    }): void => {
      it('should return the difference between two numbers', (): void => {
        expect(subtract(minuend, subtrahend)).toStrictEqual(expected)
      })

      it('should be anticommutative', (): void => {
        expect(subtract(subtrahend, minuend)).not.toStrictEqual(expected)
      })
    },
  )
})
