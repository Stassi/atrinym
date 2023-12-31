import { describe, expect, it } from '@jest/globals'
import {
  type ElementaryRuleSymmetries,
  elementaryRuleSymmetries,
} from './elementary-rule-symmetries.js'

type Domain = {
  binary: string
  booleans: boolean[]
  decimal: number
}

describe('elementaryRuleSymmetries(...)', (): void => {
  describe.each([
    {
      binary: '00000000',
      booleans: [false, false, false, false, false, false, false, false],
      decimal: 0,
    },
    {
      binary: '00011110',
      booleans: [false, false, false, true, true, true, true, false],
      decimal: 30,
    },
    {
      binary: '01101110',
      booleans: [false, true, true, false, true, true, true, false],
      decimal: 110,
    },
    {
      binary: '11111111',
      booleans: [true, true, true, true, true, true, true, true],
      decimal: 255,
    },
  ])('rule: $decimal', (domain: Domain): void => {
    describe.each(Object.keys(domain))('from %s', (key: string): void => {
      const rule: ElementaryRuleSymmetries = elementaryRuleSymmetries(
        // @ts-expect-error -- keys are valid indices
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- keys are valid indices
        domain[key],
      )

      const {
          binary: asBinary,
          booleans: asBooleans,
          decimal: asDecimal,
        }: ElementaryRuleSymmetries = rule,
        { binary, booleans, decimal }: Domain = domain

      it('should return its elementary rule as binary', (): void => {
        expect(asBinary).toBe(binary)
      })

      it('should return its elementary rule as booleans', (): void => {
        expect(asBooleans).toStrictEqual(booleans)
      })

      it('should return its elementary rule as decimal', (): void => {
        expect(asDecimal).toBe(decimal)
      })
    })
  })

  describe.each([-500, -1, 256, 500])(
    'rule: %p (invalid octet range)',
    (actual: number): void => {
      it('should throw a RangeError', (): void => {
        expect(() => elementaryRuleSymmetries(actual)).toThrow(
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
        expect(() => elementaryRuleSymmetries(actual)).toThrow(
          'Octet length must equal 8',
        )
      })
    },
  )
})
