import React, { type JSX, type ReactNode } from 'react'

/*
  eslint-disable-next-line import/no-default-export --
  Next.js requires exported default function
  Reference: https://nextjs.org/docs/app/api-reference/file-conventions/layout
*/
export default function RootLayout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
