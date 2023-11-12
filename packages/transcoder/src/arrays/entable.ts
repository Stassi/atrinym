import { add } from 'arithmetic'
import { length } from 'sequences'
import { createState } from 'state'
import { modDivideBy } from '../arithmetic/mod-divide-by.js'
import { strictEquals } from '../logic/strict-equals.js'

type EntableRoundState<T> = {
  complete: boolean
  generated: T[][]
  i: number
  remaining: T[]
}

type EntableRound<T> = {
  next: () => EntableRound<T>
  state: EntableRoundState<T>
}

const strictEqualsZero: (n: number) => boolean = strictEquals(0)

function round<T>(
  { data, width }: { data: T[]; width: number },
  state: EntableRoundState<T> = {
    complete: false,
    generated: [],
    i: 0,
    remaining: data,
  },
): EntableRound<T> {
  const { generated, i: prevI }: EntableRoundState<T> = state

  return {
    next(): EntableRound<T> {
      // noinspection JSSuspiciousNameCombination
      const i: number = add(prevI, width),
        remaining: T[] = data.slice(i)

      return round(
        { data, width },
        {
          complete: strictEqualsZero(length(remaining)),
          generated: [...generated, data.slice(prevI, i)],
          i,
          remaining,
        },
      )
    },
    state,
  }
}

export function entable<T>({
  data,
  width,
}: {
  data: T[]
  width: number
}): T[][] {
  const dataLength: number = length(data),
    modDivideByWidth: (dividend: number) => number = modDivideBy(width)

  if (strictEqualsZero(dataLength)) return []
  else if (!strictEqualsZero(modDivideByWidth(dataLength)))
    throw new RangeError(
      `Input length must be evenly divisible by width: ${width}`,
    )

  const { get: getRound, set: setRound } = createState(round({ data, width }))

  while (!getRound().state.complete) {
    setRound(getRound().next())
  }

  return getRound().state.generated
}
