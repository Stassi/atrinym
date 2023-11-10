import { describe, expect, it } from '@jest/globals'
import { length as nativeLength } from './length.js'
import { length as ramdaLength } from './ramda/length.js'

type Length = typeof nativeLength

describe('length(...)', (): void => {
  describe.each([
    {
      length: nativeLength,
      name: 'native',
    },
    {
      length: ramdaLength,
      name: 'ramda',
    },
  ])('invariant: $name', ({ length }: { length: Length }): void => {
    describe.each([
      {
        actual: [],
        expected: 0,
      },
      {
        actual: [undefined],
        expected: 1,
      },
      {
        actual: [undefined, Infinity, undefined],
        expected: 3,
      },
    ])(
      'input: $actual',
      ({
        actual,
        expected,
      }: {
        actual: Parameters<typeof length>[0]
        expected: ReturnType<typeof length>
      }): void => {
        it('should return the length of the given sequence', (): void => {
          expect(length(actual)).toStrictEqual(expected)
        })
      },
    )
  })
})
