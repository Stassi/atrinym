import React from 'react'

export function Button({ text }: { text: string }): JSX.Element {
  return <button type="button">{text}</button>
}
