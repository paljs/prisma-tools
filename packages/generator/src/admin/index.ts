import { writeFileSync } from 'fs';
import { format } from 'prettier';
import { GenerateGraphqlOptions } from '@paljs/types';
import { createGraphql } from './createGraphql';
import { mergeSchema, parseSchema } from './mergeSchema';
export { generatePages } from './buildPages';
import { Schema } from '@paljs/types';
import { convertSchemaToObject } from '@paljs/schema';

const defaultOptions: GenerateGraphqlOptions = {
  output: './src/graphql',
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
  const schema = options.schema ?? parseSchema('./prisma/adminSettings.json');
  createGraphql(schema, options);
}

export function buildSettingsSchema(folder = './prisma/') {
  const modelsObject = convertSchemaToObject(folder + 'schema.prisma');
  const newSchema = mergeSchema(modelsObject, folder + 'adminSettings.json');
  createSchemaObject(folder + 'adminSettings.json', newSchema);
  return newSchema;
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
