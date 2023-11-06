import { describe, expect, it } from '@jest/globals'
import { dec as decrement, inc as increment } from 'ramda-typed'
import { unaryPipe, variadicPipe } from './pipe.js'

type NumberCallback = (n: number) => number

describe('unaryPipe(...)', (): void => {
  describe('addOne(...)', (): void => {
    const addOne: NumberCallback = unaryPipe([increment, decrement, increment])

    it('should return one plus the given number', (): void => {
      expect(addOne(0)).toStrictEqual(1)
    })
  })

  describe('addThree(...)', (): void => {
    const addThree: NumberCallback = unaryPipe([
      increment,
      increment,
      increment,
    ])

    it('should return three plus the given number', (): void => {
      expect(addThree(0)).toStrictEqual(3)
    })
  })
})

describe('variadicPipe(...)', (): void => {
  describe('addOne(...)', (): void => {
    const addOne: NumberCallback = variadicPipe(increment, decrement, increment)

    it('should return one plus the given number', (): void => {
      expect(addOne(0)).toStrictEqual(1)
    })
  })

  describe('addThree(...)', (): void => {
    const addThree: NumberCallback = variadicPipe(
      increment,
      increment,
      increment,
    )

    it('should return three plus the given number', (): void => {
      expect(addThree(0)).toStrictEqual(3)
    })
  })
})
