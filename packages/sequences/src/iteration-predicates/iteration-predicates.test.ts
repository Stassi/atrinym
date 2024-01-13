/* eslint-disable @typescript-eslint/no-unnecessary-condition -- while(true) necessary for iteration */

import { describe, expect, it } from '@jest/globals'
import { isGenerator } from './is-generator.js'
import { isIterator } from './is-iterator.js'
import { isIterableIterator } from './is-iterable-iterator.js'
import { isIterable } from './is-iterable.js'

type NumberGenerator = Generator<number>
type NumberGeneratorInterruptableExplicit = Generator<number, 'done', boolean>
type NumberIterator = Iterator<number>

describe('iteration predicates', (): void => {
  describe.each([
    {
      *actual(): NumberGenerator {
        let i = 0
        while (true) yield i++
      },
      expected: {
        generator: true,
        iterable: true,
        iterableIterator: true,
        iterator: true,
      },
      functionName: 'generator',
    },
    {
      *actual(): NumberGeneratorInterruptableExplicit {
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
      functionName: 'generator (interruptable, explicit finish)',
    },
    {
      actual(): NumberIterator {
        let i = 0
        return {
          next(): IteratorResult<number> {
            return { value: i++ }
          },
        }
      },
      expected: {
        generator: false,
        iterable: false,
        iterableIterator: false,
        iterator: true,
      },
      functionName: 'iterator',
    },
  ])(
    'function: $functionName',
    ({
      actual,
      expected,
    }: {
      actual: () =>
        | NumberGenerator
        | NumberGeneratorInterruptableExplicit
        | NumberIterator
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
