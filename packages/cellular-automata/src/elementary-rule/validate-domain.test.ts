import { describe, expect, it } from '@jest/globals'
import { validateDomain } from './validate-domain.js'

describe('validateDomain(...)', (): void => {
  describe('invalid decimal range', (): void => {
    describe.each([-500, -1, 256, 500])('rule: %p', (actual: number): void => {
      it('should throw a RangeError', (): void => {
        expect(() => validateDomain(actual)).toThrow(
          'Decimal octet must be in range: [0, 256)',
        )
      })
    })
  })

  describe('invalid octet length', (): void => {
    describe.each([
      '',
      '0',
      '111101111',
      [],
      [false],
      [false, false, false, false, true, false, false, false, false],
    ])('ruleset: %p', (actual: boolean[] | string): void => {
      it('should throw a RangeError', (): void => {
        expect(() => validateDomain(actual)).toThrow(
          'Octet length must equal 8',
        )
      })
    })
  })
})
