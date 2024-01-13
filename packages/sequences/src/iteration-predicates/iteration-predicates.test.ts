/* eslint-disable @typescript-eslint/no-unnecessary-condition -- while(true) necessary for iteration */

import { describe, expect, it } from '@jest/globals'
import { isGenerator } from './is-generator.js'
import { isIterator } from './is-iterator.js'
import { isIterableIterator } from './is-iterable-iterator.js'
import { isIterable } from './is-iterable.js'

describe('iteration predicates', (): void => {
  describe.each([
    {
      *actual(): Generator<number> {
        let i = 0
        while (true) yield i++
      },
      expected: {
        generator: true,
        iterable: true,
        iterableIterator: true,
        iterator: true,
      },
      functionName: 'natural numbers',
    },
    {
      *actual(): Generator<number, 'done', boolean> {
        let i = 0
        while (true) if (yield i++) break
        return 'done'
      },
      expected: {
        generator: true,
        iterable: true,
        iterableIterator: true,
        iterator: true,
      },
      functionName: 'natural numbers (interruptable, explicit finish)',
    },
  ])(
    'function: $functionName',
    ({
      actual,
      expected,
    }: {
      actual: () => Generator<number> | Generator<number, 'done', boolean>
      expected: Record<
        'generator' | 'iterable' | 'iterableIterator' | 'iterator',
        boolean
      >
      functionName: string
    }): void => {
      describe.each([
        {
          predicate: isGenerator,
          predicateName: 'generator',
        },
        {
          predicate: isIterable,
          predicateName: 'iterable',
        },
        {
          predicate: isIterableIterator,
          predicateName: 'iterableIterator',
        },
        {
          predicate: isIterator,
          predicateName: 'iterator',
        },
      ])(
        'is $predicateName?',
        // @ts-expect-error -- valid predicate type
        ({
          predicate,
          predicateName,
        }: {
          predicate: (x: unknown) => boolean
          predicateName: keyof typeof expected
        }): void => {
          it('should return an object that satisfies the expected predicate', (): void => {
            expect(predicate(actual())).toBe(expected[predicateName])
          })
        },
      )
    },
  )
})
