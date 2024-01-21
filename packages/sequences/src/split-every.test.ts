import { describe, expect, it } from '@jest/globals'
import { type Sliceable } from './slice.js'
import {
  splitEvery as splitEveryDeclarative,
  splitEveryImperative,
} from './split-every.js'
import { splitEvery as ramdaSplitEvery } from './ramda/split-every.js'

describe('splitEvery(...)', (): void => {
  describe.each([
    {
      name: 'declarative (native)',
      splitEvery: splitEveryDeclarative,
    },
    {
      name: 'imperative (native)',
      splitEvery: splitEveryImperative,
    },
    {
      name: 'ramda',
      splitEvery: ramdaSplitEvery,
    },
  ])(
    'invariant: $name',
    // @ts-expect-error -- valid type
    ({ splitEvery }: { splitEvery: typeof splitEveryDeclarative }): void => {
      describe.each([
        {
          actual: {
            collection: [],
            width: 1,
          },
          expected: [],
        },
        {
          actual: {
            collection: [0, 1],
            width: 3,
          },
          expected: [[0, 1]],
        },
        {
          actual: {
            collection: [0, 1, 2, 3, 4, 5, 6],
            width: 3,
          },
          expected: [[0, 1, 2], [3, 4, 5], [6]],
        },
        {
          actual: {
            collection: [0, 1, 2, 3, 4, 5, 6],
            width: 4,
          },
          expected: [
            [0, 1, 2, 3],
            [4, 5, 6],
          ],
        },
        {
          actual: {
            collection: '',
            width: 2,
          },
          expected: [],
        },
        {
          actual: {
            collection: 'lp',
            width: 3,
          },
          expected: ['lp'],
        },
        {
          actual: {
            collection: 'tcpudpicp',
            width: 3,
          },
          expected: ['tcp', 'udp', 'icp'],
        },
      ])(
        'collection: $actual.collection; width: $actual.width',
        ({
          actual: { collection, width },
          expected,
        }: {
          actual: { collection: Sliceable<unknown>; width: number }
          expected: Sliceable<unknown>[]
        }): void => {
          it('should return slices of a given width', (): void => {
            expect(splitEvery(width, collection)).toStrictEqual(expected)
          })
        },
      )
    },
  )
})
