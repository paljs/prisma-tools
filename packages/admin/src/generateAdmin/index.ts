import convertSchema from '@prisma-tools/schema';
import { writeFileSync } from 'fs';
import { format } from 'prettier';
import { GenerateGraphqlOptions, Schema } from '../types';
import { createGraphql } from './createGraphql';
import { mergeSchema, parseSchema } from './mergeSchema';
export { generatePages } from './buildPages';

const defaultOptions: GenerateGraphqlOptions = {
  graphqlOutput: './src/graphql',
  excludeFields: [],
  excludeModels: [],
  excludeFieldsByModel: {},
  excludeQueriesAndMutations: [],
  excludeQueriesAndMutationsByModel: {},
};

export function generateGraphql(
  customOptions?: Partial<GenerateGraphqlOptions>,
) {
  const options: GenerateGraphqlOptions = {
    ...defaultOptions,
    ...customOptions,
  };
  const schema = options.schema ?? parseSchema('./prisma/schema.json');
  createGraphql(schema, options);
}

export function buildSettingsSchema(folder = './prisma/') {
  const modelsObject = convertSchema(folder + 'schema.prisma');
  const newSchema = mergeSchema(modelsObject, folder + 'schema.json');
  createSchemaObject(folder + 'schema.json', newSchema);
}

function createSchemaObject(path: string, schema: Schema) {
  const fileContent = format(`${JSON.stringify(schema)}`, {
    singleQuote: true,
    semi: false,
    trailingComma: 'all',
    parser: 'json',
  });

  writeFileSync(path, fileContent);
}
