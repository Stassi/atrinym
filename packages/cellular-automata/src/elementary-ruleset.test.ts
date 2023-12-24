import { describe, expect, it } from '@jest/globals'
import { elementaryRuleset } from './elementary-ruleset.js'

describe('elementaryRuleset(...)', (): void => {
  describe.each([
    {
      actual: 0,
      expected: [false, false, false, false, false, false, false, false],
    },
    {
      actual: 30,
      expected: [false, false, false, true, true, true, true, false],
    },
    {
      actual: 110,
      expected: [false, true, true, false, true, true, true, false],
    },
    {
      actual: 255,
      expected: [true, true, true, true, true, true, true, true],
    },
  ])(
    'rule: $actual',
    ({ actual, expected }: { actual: number; expected: boolean[] }): void => {
      it('should return a boolean array representing its elementary rules', (): void => {
        expect(elementaryRuleset(actual)).toStrictEqual(expected)
      })
    },
  )

  describe.each([
    {
      actual: -1,
      expected:
        'Range underflow: Integer input must be equal to or greater than 0.',
    },
    {
      actual: 256,
      expected:
        'Range overflow: Integer input must be less than or equal to 255.',
    },
  ])(
    'rule: $actual',
    ({ actual, expected }: { actual: number; expected: string }): void => {
      it('should throw a RangeError', (): void => {
        expect(() => elementaryRuleset(actual)).toThrow(expected)
      })
    },
  )
})
