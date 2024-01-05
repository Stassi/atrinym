import { describe, expect, it } from '@jest/globals'
import {
  type ElementaryRuleSymmetries,
  elementaryRuleSymmetries,
} from './symmetries.js'

type Domain = ElementaryRuleSymmetries & {
  symmetries: ElementaryRuleSymmetries
}

describe('elementaryRuleSymmetries(...)', (): void => {
  describe.each([
    {
      binary: '00000000',
      booleans: [false, false, false, false, false, false, false, false],
      decimal: 0,
      symmetries: elementaryRuleSymmetries(0),
    },
    {
      binary: '00011110',
      booleans: [false, false, false, true, true, true, true, false],
      decimal: 30,
      symmetries: elementaryRuleSymmetries(30),
    },
    {
      binary: '01101110',
      booleans: [false, true, true, false, true, true, true, false],
      decimal: 110,
      symmetries: elementaryRuleSymmetries(110),
    },
    {
      binary: '11111111',
      booleans: [true, true, true, true, true, true, true, true],
      decimal: 255,
      symmetries: elementaryRuleSymmetries(255),
    },
  ])('rule: $decimal', (domain: Domain): void => {
    describe.each(['binary', 'booleans', 'decimal', 'symmetries'])(
      'from %s',
      // @ts-expect-error -- valid parameter type
      (domainKey: keyof Domain): void => {
        const symmetries: ElementaryRuleSymmetries = elementaryRuleSymmetries(
          domain[domainKey],
        )

        describe.each(['binary', 'booleans', 'decimal'])(
          'representation: %s',
          // @ts-expect-error -- valid parameter type
          (symmetriesKey: keyof ElementaryRuleSymmetries): void => {
            it('should return its symmetrical representation', (): void => {
              expect(symmetries[symmetriesKey]).toStrictEqual(
                domain[symmetriesKey],
              )
            })
          },
        )
      },
    )
  })
})
