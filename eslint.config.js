import parser from '@typescript-eslint/parser'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import jestPlugin from 'eslint-plugin-jest'
import prettierPlugin from 'eslint-plugin-prettier'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactPlugin from 'eslint-plugin-react'

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: parser,
      globals: {
        browser: true,
        es2021: true,
        jest: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      jest: jestPlugin,
      prettier: prettierPlugin,
      'react-hooks': reactHooksPlugin,
      react: reactPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // Enforce Prettier formatting
      'react/jsx-filename-extension': [
        1,
        { extensions: ['.tsx'] }, // Enforce the use of .tsx extension for JSX files
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'warn', // Ensure functions have explicit return types
      '@typescript-eslint/no-unused-vars': 'warn', // Warn about unused variables
      '@typescript-eslint/no-explicit-any': 'warn', // Warn about usage of the any type
      'no-console': 'warn',
      'jest/no-disabled-tests': 'warn', // Warn about disabled tests
      'jest/no-focused-tests': 'error', // Error on focused tests
      'jest/no-identical-title': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'package-lock.json',
      '*.min.js',
      'coverage/',
      'build/',
      'public/',
      '*.md',
      '.vscode/',
      'tsconfig.json',
      'tsconfig.react.json',
    ],
  },
]
