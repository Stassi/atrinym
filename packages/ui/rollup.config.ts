import { type Plugin, type RollupOptions } from 'rollup'
import { type RollupTypescriptOptions } from '@rollup/plugin-typescript'
import typescriptErroneouslyTyped from '@rollup/plugin-typescript'

type RollupPluginTypeScript = (options?: RollupTypescriptOptions) => Plugin

const typescript =
    typescriptErroneouslyTyped as unknown as RollupPluginTypeScript,
  rollupConfig: RollupOptions = {
    external: ['react/jsx-runtime'],
    input: 'index.tsx',
    output: {
      file: 'dist/index.mjs',
    },
    plugins: [typescript({ exclude: 'rollup.config.ts' })],
  }

// eslint-disable-next-line import/no-default-export -- default export required by rollup.js
export default rollupConfig
