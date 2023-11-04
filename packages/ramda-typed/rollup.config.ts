import {
  type LoggingFunction,
  type RollupLog,
  type RollupOptions,
} from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const rollupConfig: RollupOptions = {
  // An undefined `context` implements the https://en.wikipedia.org/wiki/Principle_of_least_astonishment
  context: 'undefined',
  input: 'src/index.ts',
  /**
   * Suppresses warning: https://rollupjs.org/guide/en/#error-this-is-undefined
   * Reference: https://github.com/reduxjs/redux-toolkit/issues/1466#issuecomment-910029406
   */
  onwarn(warning: RollupLog, warn: LoggingFunction): void {
    if (warning.code === 'THIS_IS_UNDEFINED') return
    warn(warning)
  },
  output: {
    file: 'dist/index.mjs',
  },
  plugins: [
    nodeResolve(),
    // @ts-expect-error -- `@rollup/plugin-typescript` default export is callable
    typescript({
      exclude: ['**.test.ts', 'rollup.config.ts'],
    }),
  ],
}

// eslint-disable-next-line import/no-default-export -- default export required by rollup.js
export default rollupConfig
