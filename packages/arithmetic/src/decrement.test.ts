import { describe, expect, it } from '@jest/globals'
import { decrement } from './decrement.js'

describe('decrement(...)', (): void => {
  describe.each([
    {
      actual: 1,
      expected: 0,
    },
    {
      actual: 0,
      expected: -1,
    },
    {
      actual: -1,
      expected: -2,
    },
  ])(
    'input: $expected',
    ({
      actual,
      expected,
    }: {
      actual: Parameters<typeof decrement>[0]
      expected: ReturnType<typeof decrement>
    }): void => {
      it('should decrement the value by one integer', (): void => {
        expect(decrement(actual)).toStrictEqual(expected)
      })
    },
  )
})
