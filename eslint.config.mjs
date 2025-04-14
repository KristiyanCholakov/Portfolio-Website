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
  // Apply legacy ESLint configs via FlatCompat
  ...compat.extends('next/core-web-vitals', 'next'),

  // TypeScript-specific settings
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

  // Prettier + TailwindCSS plugin integration
  {
    plugins: {
      prettier: eslintPluginPrettier,
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
