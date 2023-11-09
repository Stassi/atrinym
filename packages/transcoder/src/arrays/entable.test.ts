import { describe, expect, it } from '@jest/globals'
import { entable } from './entable.js'

describe('entable', (): void => {
  describe.each([
    {
      actual: ['a', 'b'],
      expected: [['a', 'b']],
      width: 2,
    },
    {
      actual: [0, 0],
      expected: [[0, 0]],
      width: 2,
    },
    {
      actual: [0, 0, 0, 0],
      expected: [
        [0, 0],
        [0, 0],
      ],
      width: 2,
    },
    {
      actual: [0, 0, 0, 0, 0, 0, 0, 0],
      expected: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      width: 2,
    },
    {
      actual: [0, 0, 0, 0, 0, 0, 0, 0],
      expected: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      width: 4,
    },
  ])(
    'width: $width, input: $actual',
    ({
      actual,
      expected,
      width,
    }: {
      actual: unknown[]
      expected: unknown[][]
      width: number
    }) => {
      it('should return a table with rows of the given width', (): void => {
        expect(entable({ data: actual, width })).toStrictEqual(expected)
      })
    },
  )

  describe('width: 2, input: [0, 1, 2]', (): void => {
    it('should throw a RangeError', (): void => {
      expect(() => entable({ data: [0, 1, 2], width: 2 })).toThrow(
        'Input length must be evenly divisible by width: 2',
      )
    })
  })

  describe('width: 10, input: []', (): void => {
    it('should return an empty array', (): void => {
      expect(entable({ data: [], width: 10 })).toStrictEqual([])
    })
  })
})
