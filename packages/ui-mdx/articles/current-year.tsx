import { type MDXProps } from 'mdx/types.js'
import { type JSX } from 'react'
import CurrentYearUntyped from './current-year.mdx'

export const CurrentYear = CurrentYearUntyped as (
  props: MDXProps & {
    name: string
    year: number
  },
) => JSX.Element
