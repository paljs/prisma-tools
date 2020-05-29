import convertSchema from '@prisma-tools/schema';
import { writeFileSync } from 'fs';
import { format } from 'prettier';
import { Options, Schema } from './types';
import { createGraphql } from './createGraphql';
import { buildPages } from './buildPages';
import { mergeSchema } from './mergeSchema';

const defaultOptions: Options = {
  schemaOutput: './src/Api/graphql/schema/schema.json',
  graphqlOutput: './src/graphql',
  pagesOutput: './src/pages/models/admin',
  fieldsExclude: [],
  modelsExclude: [],
  excludeFieldsByModel: {},
  excludeQueriesAndMutations: [],
  excludeQueriesAndMutationsByModel: {},
};

export function generateAdmin(
  path: string,
  schema: Schema,
  customOptions?: Partial<Options>,
) {
  const options: Options = { ...defaultOptions, ...customOptions };
  const modelsObject = convertSchema(path);
  const newSchema = mergeSchema(modelsObject, schema);
  createSchemaObject(options.schemaOutput, newSchema);
  !options.disableCreateGraphql && createGraphql(newSchema, options);
  !options.disableCreatePages && buildPages(newSchema, options.pagesOutput);
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
