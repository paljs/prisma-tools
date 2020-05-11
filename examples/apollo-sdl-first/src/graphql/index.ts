import * as path from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'

const typesArray = fileLoader(
  path.join(__dirname, './models/**/typeDefs.graphql'),
)
const inputTypes = fileLoader(path.join(__dirname, './inputTypes.graphql'))

export const typeDefs = mergeTypes(typesArray.concat(inputTypes))

export const resolvers = fileLoader(
  path.join(__dirname, './models/**/resolvers.ts'),
)
