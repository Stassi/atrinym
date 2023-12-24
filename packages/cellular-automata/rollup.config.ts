import { type Plugin, type RollupOptions } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescriptErroneouslyTyped, {
  type RollupTypescriptOptions,
} from '@rollup/plugin-typescript'

type RollupPluginTypeScript = (options?: RollupTypescriptOptions) => Plugin

const typescript =
    typescriptErroneouslyTyped as unknown as RollupPluginTypeScript,
  rollupConfig: RollupOptions[] = [
    {
      input: 'src/index.ts',
      output: {
        file: 'dist/index.mjs',
      },
      plugins: [
        nodeResolve(),
        typescript({
          exclude: ['**.test.ts', 'rollup.config.ts'],
        }),
      ],
    },
  ]

// eslint-disable-next-line import/no-default-export -- default export required by rollup.js
export default rollupConfig
