import { describe, expect, it } from '@jest/globals'
import { curryAdd } from './curry-add.js'

type CurryAddOpen = typeof curryAdd
type CurryAddClosed = ReturnType<CurryAddOpen>

describe('curryAdd(...)', (): void => {
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
        expect(curryAdd(x)(y)).toStrictEqual(expected)
      })

      it('should be commutative', (): void => {
        // noinspection JSSuspiciousNameCombination
        expect(curryAdd(y)(x)).toStrictEqual(expected)
      })
    },
  )
})
