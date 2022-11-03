/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  displayName: 'nexus',
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: ['./src'],
};
