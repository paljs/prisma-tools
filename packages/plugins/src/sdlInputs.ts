import { GraphQLSchema, printSchema } from 'graphql';
import { writeFileSync } from 'fs';

export const generateGraphQlSDLFile = (schema: GraphQLSchema, path = 'schema.graphql') => {
  writeFileSync(path, printSchema(schema));
};
