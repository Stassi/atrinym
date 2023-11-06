import { describe, expect, it } from '@jest/globals'
import { inc, negate } from 'ramda-typed'
import { unaryPipe, variadicPipe } from './pipe.js'
import { pipe as ramdaPipe } from './ramda/index.js'

type NumberCallback = (n: number) => number
type NumberCallbackBinary = (x: number, y: number) => number

describe('pipe(...)', (): void => {
  const unarySequence: NumberCallback[] = [negate, inc],
    binaryThenUnarySequence: [NumberCallbackBinary, ...NumberCallback[]] = [
      Math.pow,
      ...unarySequence,
    ]

  describe('pipe (unary sequence)', (): void => {
    describe.each([
      {
        name: 'unary',
        pipe: unaryPipe(unarySequence),
      },
      {
        name: 'variadic',
        pipe: variadicPipe(...unarySequence) as unknown as NumberCallback,
      },
      {
        name: 'variadic (ramda)',
        // @ts-expect-error -- unary pipe is a number callback
        pipe: ramdaPipe(...unarySequence) as unknown as NumberCallback,
      },
    ])(
      'invariant: $name',
      // @ts-expect-error -- unary pipe is a number callback
      ({ pipe }: { name: string; pipe: NumberCallback }): void => {
        describe.each([
          {
            actual: -1,
            expected: 2,
          },
          {
            actual: 0,
            expected: 1,
          },
          {
            actual: 1,
            expected: 0,
          },
        ])(
          'input: $actual',
          ({
            actual,
            expected,
          }: {
            actual: Parameters<NumberCallback>[0]
            expected: ReturnType<NumberCallback>
          }): void => {
            it('should evaluate the result of left-to-right composition on unary sequences', (): void => {
              expect(pipe(actual)).toStrictEqual(expected)
            })
          },
        )
      },
    )
  })

  describe('pipe (ramda, binary-to-unary sequence)', (): void => {
    // @ts-expect-error -- ramda variadic pipe is a binary number callback
    const pipe: NumberCallbackBinary = ramdaPipe(...binaryThenUnarySequence)

    describe.each([
      {
        expected: -80,
        x: 3,
        y: 4,
      },
      {
        expected: -63,
        x: 4,
        y: 3,
      },
      {
        expected: -255,
        x: 4,
        y: 4,
      },
    ])(
      'input: ($x, $y)',
      ({
        expected,
        x,
        y,
      }: {
        expected: ReturnType<NumberCallbackBinary>
        x: Parameters<NumberCallbackBinary>[0]
        y: Parameters<NumberCallbackBinary>[1]
      }): void => {
        it('should evaluate the result of left-to-right composition on a binary function followed by a unary sequence', (): void => {
          expect(pipe(x, y)).toStrictEqual(expected)
        })
      },
    )
  })
})
