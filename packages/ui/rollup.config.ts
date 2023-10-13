import typescript from '@rollup/plugin-typescript'
import { type RollupOptions } from 'rollup'

const rollupConfig: RollupOptions = {
  external: ['react/jsx-runtime'],
  input: 'index.tsx',
  output: {
    file: 'dist/index.mjs',
  },
  plugins: [typescript()],
}

// eslint-disable-next-line import/no-default-export -- default export required by rollup.js
export default rollupConfig
