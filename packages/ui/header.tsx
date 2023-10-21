import React, { type JSX } from 'react'

export function Header({ text }: { text: string }): JSX.Element {
  return <h1>{text}</h1>
}
