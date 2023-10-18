import { type MDXContent } from 'mdx/types'
import { type JSX } from 'react'
import HelloWorldNonaryUntyped, {
  // @ts-expect-error -- manual verification of member export
  Thing as MdxThing,
} from './hello-world-nonary.mdx'

export const Thing = MdxThing as () => JSX.Element
export const HelloWorldNonary = HelloWorldNonaryUntyped as MDXContent
