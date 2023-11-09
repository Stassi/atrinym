import { describe, expect, it } from '@jest/globals'
import { entable } from './entable.js'

describe('entable', () => {
  describe.each([
    {
      data: ['a', 'b'],
      expected: [['a', 'b']],
      width: 2,
    },
    {
      data: [0, 0],
      expected: [[0, 0]],
      width: 2,
    },
    {
      data: [0, 0, 0, 0],
      expected: [
        [0, 0],
        [0, 0],
      ],
      width: 2,
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      expected: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      width: 2,
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      expected: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      width: 4,
    },
  ])(
    'width: $width, data: $data',
    ({
      data,
      expected,
      width,
    }: {
      data: unknown[]
      expected: unknown[][]
      width: number
    }) => {
      it('should return a table with rows of the given width', () => {
        expect(entable({ data, width })).toStrictEqual(expected)
      })
    },
  )

  describe('width: 2, data: [0, 1, 2]', () => {
    it('should throw a RangeError', () => {
      expect(() => entable({ data: [0, 1, 2], width: 2 })).toThrow(
        'Input length must be evenly divisible by width: 2',
      )
    })
  })

  describe('width: 10, data: []', () => {
    it('should return an empty array', () => {
      expect(entable({ data: [], width: 10 })).toStrictEqual([])
    })
  })
})
