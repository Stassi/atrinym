import { add, decrement, increment, subtract } from 'arithmetic'
import React, { type JSX } from 'react'
import { Button, Header } from 'ui'
import {
  CurrentYear,
  HelloWorld,
  HelloWorldNonary,
  Thing,
  Welcome,
  message,
} from 'ui-mdx'

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
      <hr />
      <CurrentYear name="Claudius" year={54} />
      <hr />
      <HelloWorld />
      <HelloWorldNonary />
      <hr />
      <Thing />
      <hr />
      {message}
      <hr />
      <Welcome />
      <hr />
      Decrement 0 to obtain {decrement(0)}. Increment 0 to obtain {increment(0)}
      . Add 1 to 2 to obtain {add(1, 2)}. Subtract 1 from 2 to obtain
      {subtract(2, 1)}.
    </>
  )
}
