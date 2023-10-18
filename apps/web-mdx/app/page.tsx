import React, { type JSX } from 'react'
import { Button, Header } from 'ui'
import { HelloWorld, HelloWorldNonary, Thing, Welcome, message } from 'ui-mdx'

/*
  eslint-disable-next-line import/no-default-export --
  Next.js requires exported default function
  Reference: https://nextjs.org/docs/app/api-reference/file-conventions/page
*/
export default function Page(): JSX.Element {
  return (
    <>
      <Welcome />

      <Header text="Web" />
      <Button text="Boop" />

      <HelloWorld />
      <HelloWorldNonary />

      <Thing />
      {message}

      <Header text={message} />
      <Button text={message} />
    </>
  )
}
