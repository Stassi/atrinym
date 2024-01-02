import { describe, expect, it } from '@jest/globals'
import { type ElementaryRule, elementaryRule } from './rule.js'
import { type ElementaryRuleEquivalences } from './equivalences.js'
import { type ElementaryRuleSymmetries } from './symmetries.js'

type Domain = {
  binary: string
  booleans: boolean[]
  complemented: number
  complementedAndReflected: number
  decimal: number
  reflected: number
}

describe('elementaryRule(...)', (): void => {
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
        const { equivalences, ...symmetries }: ElementaryRule = elementaryRule(
          // @ts-expect-error -- keys are valid indices
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- keys are valid indices
          domain[key],
        )

        describe('symmetries', (): void => {
          const {
              binary: asBinary,
              booleans: asBooleans,
              decimal: asDecimal,
            }: ElementaryRuleSymmetries = symmetries,
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

        describe('equivalences', (): void => {
          const {
              complemented: { decimal: asComplemented },
              complementedAndReflected: { decimal: asComplementedAndReflected },
              reflected: { decimal: asReflected },
            }: ElementaryRuleEquivalences = equivalences,
            { complemented, complementedAndReflected, reflected }: Domain =
              domain

          it('should return its complementary elementary rule as decimal', (): void => {
            expect(asComplemented).toBe(complemented)
          })

          it('should return its reflected elementary rule as decimal', (): void => {
            expect(asReflected).toBe(reflected)
          })

          it('should return its complementary and reflected elementary rule as decimal', (): void => {
            expect(asComplementedAndReflected).toBe(complementedAndReflected)
          })
        })
      },
    )
  })
})
