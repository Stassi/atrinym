import { describe, expect, it } from '@jest/globals'
import {
  type ElementaryRuleSymmetries,
  elementaryRuleSymmetries,
} from './symmetries.js'
import {
  type ElementaryRule,
  type ElementaryRuleParam,
  elementaryRule,
} from './rule.js'

type Domain = ElementaryRuleSymmetries & {
  symmetries: ElementaryRuleSymmetries
}

describe('elementaryRule(...)', (): void => {
  describe.each([
    {
      domain: {
        binary: '00000000',
        booleans: [false, false, false, false, false, false, false, false],
        decimal: 0,
        symmetries: elementaryRuleSymmetries(0),
      },
      expected: {
        complemented: {
          binary: '11111111',
          booleans: [true, true, true, true, true, true, true, true],
          decimal: 255,
        },
        complementedAndReflected: {
          binary: '11111111',
          booleans: [true, true, true, true, true, true, true, true],
          decimal: 255,
        },
        reflected: {
          binary: '00000000',
          booleans: [false, false, false, false, false, false, false, false],
          decimal: 0,
        },
        rule: {
          binary: '00000000',
          booleans: [false, false, false, false, false, false, false, false],
          decimal: 0,
        },
      },
    },
    {
      domain: {
        binary: '00011110',
        booleans: [false, false, false, true, true, true, true, false],
        decimal: 30,
        symmetries: elementaryRuleSymmetries(30),
      },
      expected: {
        complemented: {
          binary: '10000111',
          booleans: [true, false, false, false, false, true, true, true],
          decimal: 135,
        },
        complementedAndReflected: {
          binary: '10010101',
          booleans: [true, false, false, true, false, true, false, true],
          decimal: 149,
        },
        reflected: {
          binary: '01010110',
          booleans: [false, true, false, true, false, true, true, false],
          decimal: 86,
        },
        rule: {
          binary: '00011110',
          booleans: [false, false, false, true, true, true, true, false],
          decimal: 30,
        },
      },
    },
    {
      domain: {
        binary: '01101110',
        booleans: [false, true, true, false, true, true, true, false],
        decimal: 110,
        symmetries: elementaryRuleSymmetries(110),
      },
      expected: {
        complemented: {
          binary: '10001001',
          booleans: [true, false, false, false, true, false, false, true],
          decimal: 137,
        },
        complementedAndReflected: {
          binary: '11000001',
          booleans: [true, true, false, false, false, false, false, true],
          decimal: 193,
        },
        reflected: {
          binary: '01111100',
          booleans: [false, true, true, true, true, true, false, false],
          decimal: 124,
        },
        rule: {
          binary: '01101110',
          booleans: [false, true, true, false, true, true, true, false],
          decimal: 110,
        },
      },
    },
    {
      domain: {
        binary: '11111111',
        booleans: [true, true, true, true, true, true, true, true],
        decimal: 255,
        symmetries: elementaryRuleSymmetries(255),
      },
      expected: {
        complemented: {
          binary: '00000000',
          booleans: [false, false, false, false, false, false, false, false],
          decimal: 0,
        },
        complementedAndReflected: {
          binary: '00000000',
          booleans: [false, false, false, false, false, false, false, false],
          decimal: 0,
        },
        reflected: {
          binary: '11111111',
          booleans: [true, true, true, true, true, true, true, true],
          decimal: 255,
        },
        rule: {
          binary: '11111111',
          booleans: [true, true, true, true, true, true, true, true],
          decimal: 255,
        },
      },
    },
  ])(
    'rule: $domain.decimal',
    ({
      domain,
      expected,
    }: {
      domain: Domain
      expected: ElementaryRule
    }): void => {
      describe.each(['binary', 'booleans', 'decimal', 'symmetries'])(
        'from %s',
        // @ts-expect-error -- valid parameter type
        (domainKey: keyof Domain): void => {
          const domainElement: ElementaryRuleParam = domain[domainKey]
          const actual: ElementaryRule = elementaryRule(domainElement)

          it('should return the elementary rule equivalences including each symmetrical representation', (): void => {
            expect(actual).toStrictEqual(expected)
          })
        },
      )
    },
  )
})
