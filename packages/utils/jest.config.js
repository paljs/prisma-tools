/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  displayName: 'utils',
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: ['./src'],
};
