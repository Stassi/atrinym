import { describe, expect, it } from '@jest/globals'
import { negate as nativeNegate } from './negate.js'
import { negate as ramdaNegate } from './ramda/index.js'

type Negate = typeof nativeNegate

describe('negate(...)', (): void => {
  describe.each([
    {
      name: 'native',
      negate: nativeNegate,
    },
    {
      name: 'ramda',
      negate: ramdaNegate,
    },
  ])('invariant: $name', ({ negate }: { negate: Negate }): void => {
    describe.each([
      {
        actual: -1,
        expected: 1,
      },
      {
        actual: 0,
        expected: -0,
      },
      {
        actual: -0,
        expected: 0,
      },
      {
        actual: 1,
        expected: -1,
      },
    ])(
      'input: $actual',
      ({
        actual,
        expected,
      }: {
        actual: Parameters<Negate>[0]
        expected: ReturnType<Negate>
      }): void => {
        it('should return the additive inverse of the given number', (): void => {
          expect(negate(actual)).toStrictEqual(expected)
        })
      },
    )
  })
})
