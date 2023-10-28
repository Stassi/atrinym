import { describe, expect, it } from '@jest/globals'
import { decrement, increment } from './successors.js'

type Decrement = typeof decrement
type Increment = typeof increment

describe('successors', (): void => {
  describe.each([
    {
      actual: -1,
      decremented: -2,
      incremented: 0,
    },
    {
      actual: 0,
      decremented: -1,
      incremented: 1,
    },
    {
      actual: 1,
      decremented: 0,
      incremented: 2,
    },
  ])(
    'input: $actual',
    ({
      actual,
      decremented,
      incremented,
    }: {
      actual: Parameters<Increment>[0]
      decremented: ReturnType<Decrement>
      incremented: ReturnType<Increment>
    }): void => {
      describe('decrement(...)', (): void => {
        it('should decrement the value by one integer', (): void => {
          expect(decrement(actual)).toStrictEqual(decremented)
        })
      })

      describe('increment(...)', (): void => {
        it('should increment the value by one integer', (): void => {
          expect(increment(actual)).toStrictEqual(incremented)
        })
      })
    },
  )
})
