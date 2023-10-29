/*
  eslint-disable
  @typescript-eslint/no-explicit-any,
  @typescript-eslint/no-unsafe-return,
  -- `any` required for complex type implementation(s)
*/

type FirstElement<T extends any[]> = T extends [infer U, ...any[]] ? U : never
type LastElement<T extends any[]> = T extends [...any[], infer U] ? U : never

// @ts-expect-error -- `unknown` type inferred
type FirstElementParameter<T> = Parameters<FirstElement<T>>[0]
// @ts-expect-error -- `unknown` type inferred
type LastElementReturns<T> = ReturnType<LastElement<T>>

type UnaryFn = (...args: any[]) => any

export function nAryPipe<Fns extends UnaryFn[]>(
  ...fns: Fns
): (initial: FirstElementParameter<Fns>) => LastElementReturns<Fns> {
  return (initial: FirstElementParameter<Fns>): LastElementReturns<Fns> => {
    return fns.reduce(
      (accumulated: any, fn: UnaryFn) => fn(accumulated),
      initial,
    )
  }
}

export function unaryPipe<Fns extends UnaryFn[]>(
  fns: [...Fns],
): (initial: FirstElementParameter<Fns>) => LastElementReturns<Fns> {
  return (initial: FirstElementParameter<Fns>): LastElementReturns<Fns> => {
    return fns.reduce(
      (accumulated: any, fn: UnaryFn) => fn(accumulated),
      initial,
    )
  }
}
