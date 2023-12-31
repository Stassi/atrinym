import { describe, expect, it } from '@jest/globals'
import {
  type ElementaryRuleEquivalences,
  elementaryRuleEquivalences,
} from './elementary-rule-equivalences.js'

type Domain = {
  binary: string
  booleans: boolean[]
  complemented: number
  complementedAndReflected: number
  decimal: number
  reflected: number
}

describe('elementaryRuleEquivalences(...)', (): void => {
  describe.each([
    {
      binary: '00000000',
      booleans: [false, false, false, false, false, false, false, false],
      complemented: 255,
      complementedAndReflected: 255,
      decimal: 0,
      reflected: 0,
    },
    {
      binary: '00011110',
      booleans: [false, false, false, true, true, true, true, false],
      complemented: 135,
      complementedAndReflected: 149,
      decimal: 30,
      reflected: 86,
    },
    {
      binary: '01101110',
      booleans: [false, true, true, false, true, true, true, false],
      complemented: 137,
      complementedAndReflected: 193,
      decimal: 110,
      reflected: 124,
    },
    {
      binary: '11111111',
      booleans: [true, true, true, true, true, true, true, true],
      complemented: 0,
      complementedAndReflected: 0,
      decimal: 255,
      reflected: 255,
    },
  ])('rule: $decimal', (domain: Domain): void => {
    describe.each(['binary', 'booleans', 'decimal'])(
      'from %s',
      (key: string): void => {
        const rule: ElementaryRuleEquivalences = elementaryRuleEquivalences(
          // @ts-expect-error -- keys are valid indices
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- keys are valid indices
          domain[key],
        )

        const {
            complemented: asComplemented,
            complementedAndReflected: asComplementedAndReflected,
            reflected: asReflected,
          }: ElementaryRuleEquivalences = rule,
          { complemented, complementedAndReflected, reflected }: Domain = domain

        it('should return its complementary elementary rule as decimal', (): void => {
          expect(asComplemented.decimal).toBe(complemented)
        })

        it('should return its reflected elementary rule as decimal', (): void => {
          expect(asReflected.decimal).toBe(reflected)
        })

        it('should return its complementary and reflected elementary rule as decimal', (): void => {
          expect(asComplementedAndReflected.decimal).toBe(
            complementedAndReflected,
          )
        })
      },
    )
  })

  describe.each([-500, -1, 256, 500])(
    'rule: %p (invalid octet range)',
    (actual: number): void => {
      it('should throw a RangeError', (): void => {
        expect(() => elementaryRuleEquivalences(actual)).toThrow(
          'Decimal octet must be in range: [0, 256)',
        )
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
        expect(() => elementaryRuleEquivalences(actual)).toThrow(
          'Octet length must equal 8',
        )
      })
    },
  )
})
