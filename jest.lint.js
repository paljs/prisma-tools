/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  displayName: 'lint',
  runner: 'jest-runner-eslint',
  testMatch: ['<rootDir>/packages/**/*.(ts|js|tsx)'],
};
