import { describe, expect, it } from '@jest/globals'
import {
  type ElementaryRuleEquivalences,
  elementaryRuleEquivalences,
} from './equivalences.js'
import {
  type ElementaryRuleSymmetries,
  elementaryRuleSymmetries,
} from './symmetries.js'

type ElementaryRuleEquivalencesKeys = keyof ElementaryRuleEquivalences

describe('elementaryRuleEquivalences(...)', (): void => {
  describe.each([
    {
      complemented: 255,
      complementedAndReflected: 255,
      reflected: 0,
      rule: 0,
    },
    {
      complemented: 135,
      complementedAndReflected: 149,
      reflected: 86,
      rule: 30,
    },
    {
      complemented: 137,
      complementedAndReflected: 193,
      reflected: 124,
      rule: 110,
    },
    {
      complemented: 0,
      complementedAndReflected: 0,
      reflected: 255,
      rule: 255,
    },
  ])(
    'rule: $rule',
    (domain: Record<ElementaryRuleEquivalencesKeys, number>): void => {
      const symmetries: ElementaryRuleSymmetries = elementaryRuleSymmetries(
          domain.rule,
        ),
        equivalences: ElementaryRuleEquivalences =
          elementaryRuleEquivalences(symmetries)

      describe.each([
        'complemented',
        'complementedAndReflected',
        'reflected',
        'rule',
        // @ts-expect-error -- valid parameter type
      ])('equivalence: %s', (key: ElementaryRuleEquivalencesKeys): void => {
        it('should return its equivalent rule', (): void => {
          expect(equivalences[key].decimal).toBe(domain[key])
        })
      })
    },
  )
})
