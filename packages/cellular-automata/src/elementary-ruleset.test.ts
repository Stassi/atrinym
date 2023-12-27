import { describe, expect, it } from '@jest/globals'
import { rulesetToBinary, rulesetToBooleans } from './elementary-ruleset.js'

describe('elementary ruleset', (): void => {
  describe.each([
    {
      actual: 0,
      binary: '00000000',
      booleans: [false, false, false, false, false, false, false, false],
    },
    {
      actual: 30,
      binary: '00011110',
      booleans: [false, false, false, true, true, true, true, false],
    },
    {
      actual: 110,
      binary: '01101110',
      booleans: [false, true, true, false, true, true, true, false],
    },
    {
      actual: 255,
      binary: '11111111',
      booleans: [true, true, true, true, true, true, true, true],
    },
  ])(
    'rule: $actual',
    ({
      actual,
      binary,
      booleans,
    }: {
      actual: number
      binary: string
      booleans: boolean[]
    }): void => {
      describe('to binary', (): void => {
        it('should return its elementary ruleset', (): void => {
          expect(rulesetToBinary(actual)).toStrictEqual(binary)
        })
      })

      describe('to booleans', (): void => {
        it('should return its elementary ruleset', (): void => {
          expect(rulesetToBooleans(actual)).toStrictEqual(booleans)
        })
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
      describe('to binary', (): void => {
        it('should throw a RangeError', (): void => {
          expect(() => rulesetToBinary(actual)).toThrow(expected)
        })
      })

      describe('to booleans', (): void => {
        it('should throw a RangeError', (): void => {
          expect(() => rulesetToBooleans(actual)).toThrow(expected)
        })
      })
    },
  )
})
