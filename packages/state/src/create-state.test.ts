import { describe, expect, it } from '@jest/globals'
import { createState, type State } from './create-state.js'

function doubleNumber(n: number): number {
  return n * 2
}

function doubleString(s: string): string {
  return `${s}${s}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- `any` required in utility types
type Test<T extends (...args: any[]) => any> = {
  actual: Parameters<T>[0]
  double: T
  expected: ReturnType<T>
}

describe('createState(...)', (): void => {
  describe.each([
    {
      actual: 0,
      double: doubleNumber,
      expected: 0,
    },
    {
      actual: 10,
      double: doubleNumber,
      expected: 20,
    },
    {
      actual: '℈',
      double: doubleString,
      expected: '℈℈',
    },
    {
      actual: '⅍',
      double: doubleString,
      expected: '⅍⅍',
    },
  ])(
    'input: $actual',
    ({
      actual,
      double,
      expected,
    }: Test<typeof doubleNumber | typeof doubleString>): void => {
      type TestState = State<ReturnType<typeof double>>

      it('should initialize with its initial value', (): void => {
        const state: TestState = createState(actual)
        expect(state.get()).toBe(actual)
      })

      it('should mutate and retrieve its current state', (): void => {
        const state: TestState = createState(actual)

        // @ts-expect-error -- known but incorrectly inferred argument type
        state.set(double(state.get()))

        expect(state.get()).toBe(expected)
      })
    },
  )
})
