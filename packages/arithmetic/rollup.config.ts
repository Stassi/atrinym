import { type RollupOptions } from 'rollup'
import typescript from '@rollup/plugin-typescript'

const rollupConfig: RollupOptions = {
  external: ['react/jsx-runtime'],
  input: 'src/index.ts',
  output: {
    file: 'dist/index.mjs',
  },
  // @ts-expect-error -- `@rollup/plugin-typescript` default export is callable
  plugins: [typescript({ exclude: 'rollup.config.ts' })],
}

// eslint-disable-next-line import/no-default-export -- default export required by rollup.js
export default rollupConfig
