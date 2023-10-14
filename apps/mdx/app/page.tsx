import React, { type JSX } from 'react'
import Content from './content.mdx'

/*
  eslint-disable-next-line import/no-default-export --
  Next.js requires exported default function
  Reference: https://nextjs.org/docs/app/api-reference/file-conventions/page
*/
export default function Page(): JSX.Element {
  return <Content />
}
