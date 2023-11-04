import { type RollupOptions, type Plugin } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescriptErroneouslyTyped, {
  type RollupTypescriptOptions,
} from '@rollup/plugin-typescript'

type RollupPluginTypeScript = (options?: RollupTypescriptOptions) => Plugin

const typescript =
    typescriptErroneouslyTyped as unknown as RollupPluginTypeScript,
  ramdaDirectory = 'src/ramda/**.ts',
  testFiles = '**.test.ts',
  rollupConfig: RollupOptions[] = [
    {
      input: 'src/index.ts',
      output: {
        file: 'dist/index.mjs',
      },
      plugins: [
        nodeResolve(),
        typescript({
          exclude: [ramdaDirectory, testFiles, 'rollup.config.ts'],
        }),
      ],
    },
    {
      input: 'src/ramda/index.ts',
      output: {
        file: 'dist/ramda/index.mjs',
      },
      plugins: [
        nodeResolve(),
        typescript({
          exclude: testFiles,
          include: ramdaDirectory,
        }),
      ],
    },
  ]

// eslint-disable-next-line import/no-default-export -- default export required by rollup.js
export default rollupConfig
