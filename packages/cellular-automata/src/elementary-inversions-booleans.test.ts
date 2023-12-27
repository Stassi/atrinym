import { describe, expect, it } from '@jest/globals'
import {
  invertColor,
  invertColorAndLeftRight,
  invertLeftRight,
} from './elementary-inversions-booleans.js'

describe('elementary inversions: boolean[]', (): void => {
  describe.each([
    {
      color: [true, true, true, true, true, true, true, true],
      colorLeftRight: [true, true, true, true, true, true, true, true],
      expected: [false, false, false, false, false, false, false, false],
      leftRight: [false, false, false, false, false, false, false, false],
      rule: 0,
    },
    {
      color: [true, false, false, false, false, true, true, true],
      colorLeftRight: [true, false, false, true, false, true, false, true],
      expected: [false, false, false, true, true, true, true, false],
      leftRight: [false, true, false, true, false, true, true, false],
      rule: 30,
    },
    {
      color: [true, false, false, false, true, false, false, true],
      colorLeftRight: [true, true, false, false, false, false, false, true],
      expected: [false, true, true, false, true, true, true, false],
      leftRight: [false, true, true, true, true, true, false, false],
      rule: 110,
    },
    {
      color: [false, false, false, false, false, false, false, false],
      colorLeftRight: [false, false, false, false, false, false, false, false],
      expected: [true, true, true, true, true, true, true, true],
      leftRight: [true, true, true, true, true, true, true, true],
      rule: 255,
    },
  ])(
    'rule: $rule',
    ({
      color,
      colorLeftRight,
      expected,
      leftRight,
    }: {
      color: boolean[]
      colorLeftRight: boolean[]
      expected: boolean[]
      leftRight: boolean[]
      rule: number
    }): void => {
      describe('invertColor(...)', (): void => {
        it('should return its inverted invariant', (): void => {
          expect(invertColor(expected)).toStrictEqual(color)
        })
      })

      describe('invertLeftRight(...)', (): void => {
        it('should return its inverted invariant', (): void => {
          expect(invertLeftRight(expected)).toStrictEqual(leftRight)
        })
      })

      describe('invertColorAndLeftRight(...)', (): void => {
        it('should return its inverted invariant', (): void => {
          expect(invertColorAndLeftRight(expected)).toStrictEqual(
            colorLeftRight,
          )
        })
      })
    },
  )
})
