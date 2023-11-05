import { type MDXContent } from 'mdx/types.js'
import HelloWorldUntyped, {
  // @ts-expect-error -- manual verification of member export
  message as mdxMessage,
} from './hello-world.mdx'

export const message = mdxMessage as string
export const HelloWorld = HelloWorldUntyped as MDXContent
