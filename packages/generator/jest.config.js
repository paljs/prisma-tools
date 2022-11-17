/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  displayName: 'generator',
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: ['./src'],
};
