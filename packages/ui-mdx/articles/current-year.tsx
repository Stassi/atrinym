import { type MDXProps } from 'mdx/types'
import { type JSX } from 'react'
import CurrentYearUntyped from './current-year.mdx'

export const CurrentYear = CurrentYearUntyped as (
  props: MDXProps & {
    name: string
    year: number
  },
) => JSX.Element
