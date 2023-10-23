// noinspection JSCheckFunctionSignatures

const { resolve: resolveFileName } = require

const eslintConfig = {
  extends: [
    ...[
      '@vercel/style-guide/eslint/browser',
      '@vercel/style-guide/eslint/next',
      '@vercel/style-guide/eslint/node',
      '@vercel/style-guide/eslint/react',
    ].map(resolveFileName),
    'eslint:recommended',
    'next',
    'plugin:import/recommended',
    'plugin:json/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier',
    'turbo',
  ],
  ignorePatterns: ['**/dist/*'],
  overrides: [
    {
      extends: [
        resolveFileName('@vercel/style-guide/eslint/typescript'),
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/recommended-type-checked',
      ],
      files: ['./**/*.{cts,mts,ts,tsx}'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    babelOptions: {
      presets: [resolveFileName('next/babel')],
      project: true,
      tsconfigRootDir: __dirname,
    },
  },
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    'arrow-body-style': 'off',
    'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    'prefer-arrow-callback': 'off',
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        trailingCommas: 'all',
      },
    ],
    'sort-keys': 'error',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.cts', '.mts', '.ts', '.tsx'],
    },
    'import/resolver': {
      node: true,
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
}

module.exports = eslintConfig
