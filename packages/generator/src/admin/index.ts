import { writeFileSync } from 'fs';
import { format } from 'prettier';
import { GeneratorOptions, AdminPagesOptions, SchemaObject } from '@paljs/types';
import { createGraphql } from './createGraphql';
import { mergeSchema } from './mergeSchema';
import { ConvertSchemaToObject } from '@paljs/schema';
import { createFile } from './createFile';

const defaultOptions: GeneratorOptions = {
  prismaName: 'prisma',
  output: './src/graphql',
  excludeFields: [],
  excludeModels: [],
  excludeFieldsByModel: {},
  excludeQueriesAndMutations: [],
  excludeQueriesAndMutationsByModel: {},
};

export class UIGenerator {
  schema: SchemaObject;

  constructor(schemaPath: string | string[]) {
    this.schema =
      typeof schemaPath === 'string'
        ? new ConvertSchemaToObject(schemaPath).run()
        : this.mergeSchemas(schemaPath.map((path) => new ConvertSchemaToObject(path).run()));
  }

  mergeSchemas(schemas: SchemaObject[]) {
    const schema: SchemaObject = { models: [], enums: [] };
    schemas.forEach((s) => {
      schema.models.push(...s.models);
      schema.enums.push(...s.enums);
    });
    return schema;
  }

  buildSettingsSchema(path = 'adminSettings.json', backAsText?: boolean) {
    const newSchema = mergeSchema(this.schema, path);
    const fileContent = format(`${JSON.stringify(newSchema)}`, {
      singleQuote: true,
      semi: false,
      trailingComma: 'all',
      parser: 'json',
    });

    !backAsText && writeFileSync(path, fileContent);

    return newSchema;
  }

  generateGraphql(customOptions?: Omit<Partial<GeneratorOptions>, 'nexusSchema'>) {
    const options: GeneratorOptions = {
      ...defaultOptions,
      ...customOptions,
    };
    return createGraphql(this.schema, options);
  }

  generateAdminPages(options?: AdminPagesOptions) {
    const content = options?.pageContent ?? page;
    const generatedText: Record<string, string> = {};
    this.schema.models
      .filter((model) => !options?.models || options?.models.includes(model.name))
      .forEach((model) => {
        const fileContent = format(content.replace(/#{id}/g, model.name), {
          semi: true,
          trailingComma: 'all',
          singleQuote: true,
          printWidth: 120,
          tabWidth: 2,
          parser: 'babel-ts',
        });
        if (options?.backAsText) {
          generatedText[model.name] = fileContent;
        } else {
          createFile(options?.outPut ?? 'src/pages/admin/models/', `${model.name}.tsx`, fileContent);
        }
      });
    return generatedText;
  }
}

const page = `
import React from 'react';
import PrismaTable from 'components/PrismaTable';

const #{id}: React.FC = () => {
  return <PrismaTable model="#{id}" />;
};

export default #{id};
`;
