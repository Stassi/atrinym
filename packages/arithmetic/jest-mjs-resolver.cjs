/**
 * Resolves file extensions `.mjs` as `.mts` as required by
 * {@link https://kulshekhar.github.io/ts-jest/docs/guides/esm-support#support-mts-extension ts-jest}.
 * @example Jest configuration
 * jest: {
 *   // ...
 *   resolver: '<rootDir>/mjs-resolver.cjs'
 * }
 * @param {string} path
 * @param {import('jest-resolve').ResolverOptions} options
 * @return {string}
 */
function jestMjsResolver(path, options) {
  return options.defaultResolver(
    path.endsWith('.mjs') ? `${path.substring(0, path.length - 2)}ts` : path,
    options,
  )
}

module.exports = jestMjsResolver
