import nextMdx from '@next/mdx'

/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {(config: NextConfig) => NextConfig} WithMDX
 */

/** @type {WithMDX} */
const withMdx = nextMdx({
  extension: /\.mdx?$/,
})

/** @type {NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

/** @type {NextConfig} */
const nextConfigWithMdx = withMdx(nextConfig)

/*
  eslint-disable-next-line import/no-default-export --
  Next.js requires exported default function
  Reference: https://nextjs.org/docs/app/api-reference/next-config-js
*/
export default nextConfigWithMdx
