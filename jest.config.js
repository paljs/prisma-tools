/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname', 'jest-watch-select-projects'],
  projects: [
    './jest.lint.js',
    './packages/schema/jest.config.js',
    './packages/utils/jest.config.js',
    './packages/plugins/jest.config.js',
    './packages/nexus/jest.config.js',
    './packages/generator/jest.config.js',
  ],
};
