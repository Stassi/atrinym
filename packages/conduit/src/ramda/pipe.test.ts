import { describe, expect, it } from '@jest/globals'
import { dec, inc } from 'ramda-typed'
import { pipe as ramdaPipe } from './pipe.js'

type NumberCallback = (n: number) => number

describe('ramda pipe(...)', (): void => {
  describe('addOne(...)', (): void => {
    const addOne: NumberCallback = ramdaPipe(inc, dec, inc)

    it('should return one plus the given number', (): void => {
      expect(addOne(0)).toStrictEqual(1)
    })
  })

  describe('addThree(...)', (): void => {
    const addThree: NumberCallback = ramdaPipe(inc, inc, inc)

    it('should return three plus the given number', (): void => {
      expect(addThree(0)).toStrictEqual(3)
    })
  })
})
