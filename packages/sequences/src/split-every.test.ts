import { describe, expect, it } from '@jest/globals'
import { splitEvery as ramdaSplitEvery } from './ramda/split-every.js'
import {
  type Splittable,
  splitEvery as nativeSplitEvery,
} from './split-every.js'

type SplitEvery = typeof nativeSplitEvery

describe('splitEvery(...)', (): void => {
  describe.each([
    {
      name: 'native',
      splitEvery: nativeSplitEvery,
    },
    {
      name: 'ramda',
      splitEvery: ramdaSplitEvery,
    },
    // @ts-expect-error -- valid type
  ])('invariant: $name', ({ splitEvery }: { splitEvery: SplitEvery }): void => {
    describe.each([
      {
        actual: {
          collection: [0, 1, 2, 3, 4, 5, 6],
          length: 3,
        },
        expected: [[0, 1, 2], [3, 4, 5], [6]],
      },
      {
        actual: {
          collection: 'tcpudpicp',
          length: 3,
        },
        expected: ['tcp', 'udp', 'icp'],
      },
    ])(
      'input: $actual',
      ({
        actual: { collection, length },
        expected,
      }: {
        actual: { length: number; collection: Splittable<unknown> }
        expected: Splittable<unknown>[]
      }): void => {
        it('should return the length of the given sequence', (): void => {
          expect(splitEvery(length, collection)).toStrictEqual(expected)
        })
      },
    )
  })
})
