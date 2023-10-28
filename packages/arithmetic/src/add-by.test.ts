import { describe, expect, it } from '@jest/globals'
import { addBy } from './add-by.js'

type CurryAddOpen = typeof addBy
type CurryAddClosed = ReturnType<CurryAddOpen>

describe('addBy(...)', (): void => {
  describe.each([
    {
      expected: -2,
      x: -1,
      y: -1,
    },
    {
      expected: 0,
      x: -1,
      y: 1,
    },
    {
      expected: 2,
      x: 1,
      y: 1,
    },
  ])(
    'inputs: $x, $y',
    ({
      expected,
      x,
      y,
    }: {
      expected: ReturnType<CurryAddClosed>
      x: Parameters<CurryAddOpen>[0]
      y: Parameters<CurryAddClosed>[0]
    }): void => {
      it('should return the sum of both numbers', (): void => {
        expect(addBy(x)(y)).toStrictEqual(expected)
      })

      it('should be commutative', (): void => {
        // noinspection JSSuspiciousNameCombination
        expect(addBy(y)(x)).toStrictEqual(expected)
      })
    },
  )
})
