import { describe, expect, it } from '@jest/globals'
import { elementaryRule } from './elementary-rule.js'

describe('elementaryRule(...)', (): void => {
  describe.each([
    {
      binary: '00000000',
      booleans: [false, false, false, false, false, false, false, false],
      expected: 0,
    },
    {
      binary: '00011110',
      booleans: [false, false, false, true, true, true, true, false],
      expected: 30,
    },
    {
      binary: '01101110',
      booleans: [false, true, true, false, true, true, true, false],
      expected: 110,
    },
    {
      binary: '11111111',
      booleans: [true, true, true, true, true, true, true, true],
      expected: 255,
    },
  ])(
    'rule: $expected',
    ({
      binary,
      booleans,
      expected,
    }: {
      binary: string
      booleans: boolean[]
      expected: number
    }): void => {
      describe('from binary', (): void => {
        it('should return its elementary rule', (): void => {
          expect(elementaryRule(binary)).toBe(expected)
        })
      })

      describe('from booleans', (): void => {
        it('should return its elementary rule', (): void => {
          expect(elementaryRule(booleans)).toBe(expected)
        })
      })
    },
  )

  describe.each([
    '',
    '0',
    '111101111',
    [],
    [false],
    [false, false, false, false, true, false, false, false, false],
  ])(
    'ruleset: %p (invalid octet length)',
    (actual: boolean[] | string): void => {
      it('should throw a RangeError', (): void => {
        expect(() => elementaryRule(actual)).toThrow(
          'Octet input length must be 8.',
        )
      })
    },
  )
})
