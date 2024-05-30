// @ts-check
const eslint = require('@eslint/js');
const ts = require('typescript-eslint');
const jest = require('eslint-plugin-jest');

module.exports = ts.config(
  { ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/examples/**', '.vscode/**', '.github/**'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [eslint.configs.recommended, ...ts.configs.strict, ...ts.configs.stylistic],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-invalid-void-type': 'off',
    },
  },
  {
    // disable type-aware linting on JS files
    files: ['**/*.js'],
    ...ts.configs.disableTypeChecked,
  },
  {
    // enable jest rules on test files
    files: ['**/*.test.ts', '**/*.spec.ts'],
    ...jest.configs['flat/recommended'],
  },
  {
    files: ['**/*.js'],
    rules: {
      'no-undef': 'off',
    },
  },
);
