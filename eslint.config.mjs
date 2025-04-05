import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const { default: eslintPluginPrettier } = await import('eslint-plugin-prettier')

export default [
  ...compat.extends('next/core-web-vitals', 'next'),

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  {
    plugins: {
      prettier: {
        rules: eslintPluginPrettier.rules,
      },
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'es5',
          arrowParens: 'avoid',
          bracketSpacing: true,
          printWidth: 100,
          tabWidth: 2,
          plugins: ['prettier-plugin-tailwindcss'],
          tailwindConfig: './tailwind.config.ts',
        },
      ],
    },
  },
]
