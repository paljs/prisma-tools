import { GraphQLSchema } from 'graphql';
import { writeFileSync } from 'fs';

export const generateGraphQlSDLFile = (schema: GraphQLSchema, path = 'schema.graphql') => {
  const { printSchema } = require('graphql');
  writeFileSync(path, printSchema(schema));
};
