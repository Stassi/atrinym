import { describe, expect, it } from '@jest/globals'
import {
  invertColorAndLeftRightEquivalentRule,
  invertColorEquivalentRule,
  invertLeftRightEquivalentRule,
} from './elementary-equivalences.js'

describe('elementary equivalences', (): void => {
  describe.each([
    {
      color: 255,
      colorLeftRight: 255,
      expected: 0,
      leftRight: 0,
    },
    {
      color: 135,
      colorLeftRight: 149,
      expected: 30,
      leftRight: 86,
    },
    {
      color: 137,
      colorLeftRight: 193,
      expected: 110,
      leftRight: 124,
    },
    {
      color: 0,
      colorLeftRight: 0,
      expected: 255,
      leftRight: 255,
    },
  ])(
    'rule: $expected',
    ({
      color,
      colorLeftRight,
      expected,
      leftRight,
    }: {
      color: number
      colorLeftRight: number
      expected: number
      leftRight: number
    }): void => {
      describe('invertColorBinary(...)', (): void => {
        it('should return its inverted invariant equivalent rule', (): void => {
          expect(invertColorEquivalentRule(expected)).toBe(color)
        })
      })

      describe('invertLeftRightBinary(...)', (): void => {
        it('should return its inverted invariant equivalent rule', (): void => {
          expect(invertLeftRightEquivalentRule(expected)).toBe(leftRight)
        })
      })

      describe('invertColorAndLeftRightBinary(...)', (): void => {
        it('should return its inverted invariant equivalent rule', (): void => {
          expect(invertColorAndLeftRightEquivalentRule(expected)).toBe(
            colorLeftRight,
          )
        })
      })
    },
  )
})
