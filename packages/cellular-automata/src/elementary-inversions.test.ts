import { describe, expect, it } from '@jest/globals'
import {
  invertColorAndLeftRightBinary,
  invertColorAndLeftRightBooleans,
  invertColorBinary,
  invertColorBooleans,
  invertLeftRightBinary,
  invertLeftRightBooleans,
} from './elementary-inversions.js'

describe('elementary inversions', (): void => {
  describe('binary', (): void => {
    describe.each([
      {
        color: '11111111',
        colorLeftRight: '11111111',
        expected: '00000000',
        leftRight: '00000000',
        rule: 0,
      },
      {
        color: '10000111',
        colorLeftRight: '10010101',
        expected: '00011110',
        leftRight: '01010110',
        rule: 30,
      },
      {
        color: '10001001',
        colorLeftRight: '11000001',
        expected: '01101110',
        leftRight: '01111100',
        rule: 110,
      },
      {
        color: '00000000',
        colorLeftRight: '00000000',
        expected: '11111111',
        leftRight: '11111111',
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
        color: string
        colorLeftRight: string
        expected: string
        leftRight: string
        rule: number
      }): void => {
        describe('invertColorBinary(...)', (): void => {
          it('should return its inverted invariant', (): void => {
            expect(invertColorBinary(expected)).toStrictEqual(color)
          })
        })

        describe('invertLeftRightBinary(...)', (): void => {
          it('should return its inverted invariant', (): void => {
            expect(invertLeftRightBinary(expected)).toStrictEqual(leftRight)
          })
        })

        describe('invertColorAndLeftRightBinary(...)', (): void => {
          it('should return its inverted invariant', (): void => {
            expect(invertColorAndLeftRightBinary(expected)).toStrictEqual(
              colorLeftRight,
            )
          })
        })
      },
    )
  })

  describe('boolean[]', (): void => {
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
        colorLeftRight: [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
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
        describe('invertColorBooleans(...)', (): void => {
          it('should return its inverted invariant', (): void => {
            expect(invertColorBooleans(expected)).toStrictEqual(color)
          })
        })

        describe('invertLeftRightBooleans(...)', (): void => {
          it('should return its inverted invariant', (): void => {
            expect(invertLeftRightBooleans(expected)).toStrictEqual(leftRight)
          })
        })

        describe('invertColorAndLeftRightBooleans(...)', (): void => {
          it('should return its inverted invariant', (): void => {
            expect(invertColorAndLeftRightBooleans(expected)).toStrictEqual(
              colorLeftRight,
            )
          })
        })
      },
    )
  })
})
