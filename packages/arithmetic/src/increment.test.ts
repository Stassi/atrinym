import { describe, expect, it } from '@jest/globals'
import { increment } from './increment.js'

describe('increment(...)', (): void => {
  describe.each([
    {
      actual: -1,
      expected: 0,
    },
    {
      actual: 0,
      expected: 1,
    },
    {
      actual: 1,
      expected: 2,
    },
  ])(
    'input: $expected',
    ({
      actual,
      expected,
    }: {
      actual: Parameters<typeof increment>[0]
      expected: ReturnType<typeof increment>
    }): void => {
      it('should increment the value by one integer', (): void => {
        expect(increment(actual)).toStrictEqual(expected)
      })
    },
  )
})
