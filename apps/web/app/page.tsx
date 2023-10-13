import React, { type JSX } from 'react'
import { Button, Header } from 'ui'

/*
  eslint-disable-next-line import/no-default-export --
  Next.js requires exported default function
  Reference: https://nextjs.org/docs/app/api-reference/file-conventions/page
*/
export default function Page(): JSX.Element {
  return (
    <>
      <Header text="Web" />
      <Button text="Boop" />
    </>
  )
}
