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

  async buildSettingsSchema(path = 'adminSettings.json', backAsText?: boolean) {
    const newSchema = mergeSchema(this.schema, path);
    const fileContent = await format(`${JSON.stringify(newSchema)}`, {
      singleQuote: true,
      semi: false,
      trailingComma: 'all',
      parser: 'json',
    });

    void (!backAsText && writeFileSync(path, fileContent));

    return newSchema;
  }

  async generateGraphql(customOptions?: Omit<Partial<GeneratorOptions>, 'nexusSchema'>) {
    const options: GeneratorOptions = {
      ...defaultOptions,
      ...customOptions,
    };
    return await createGraphql(this.schema, options);
  }

  /**
   * Generate admin pages for Prisma models
   * @param options - Configuration options for page generation
   * @param options.routerType - Router type: 'pages' for Next.js Pages Router or 'app' for Next.js App Router
   * @param options.models - Array of model names to generate pages for
   * @param options.pageContent - Custom page template content
   * @param options.outPut - Output directory path
   * @param options.backAsText - Return generated content as text instead of writing files
   * @returns Generated page content as text (if backAsText is true) or void
   */
  async generateAdminPages(options?: AdminPagesOptions) {
    const routerType = options?.routerType ?? 'pages';
    const content = options?.pageContent ?? (routerType === 'app' ? appRouterPage : pagesRouterPage);
    const generatedText: Record<string, string> = {};
    const filterModels = this.schema.models.filter((model) => !options?.models || options?.models.includes(model.name));

    // Generate layout files for App Router if needed
    if (routerType === 'app' && !options?.backAsText) {
      await this.generateAppRouterLayouts(options);
    }

    for (const model of filterModels) {
      if (routerType === 'app') {
        // Generate App Router structure: app/admin/models/[model]/page.tsx
        const fileContent = await format(content.replace(/#{id}/g, model.name), {
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
          const outputPath = options?.outPut ?? 'src/app/admin/models/';
          const modelPath = `${outputPath}${model.name}/`;
          createFile(modelPath, 'page.tsx', fileContent);
        }
      } else {
        // Generate Pages Router structure: pages/admin/models/[model].tsx
        const fileContent = await format(content.replace(/#{id}/g, model.name), {
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
      }
    }
    return generatedText;
  }

  async generateAppRouterLayouts(options?: AdminPagesOptions) {
    const outputPath = options?.outPut ?? 'src/app/admin/';

    // Generate root admin layout
    const adminLayoutContent = await format(adminLayout, {
      semi: true,
      trailingComma: 'all',
      singleQuote: true,
      printWidth: 120,
      tabWidth: 2,
      parser: 'babel-ts',
    });
    createFile(outputPath, 'layout.tsx', adminLayoutContent);

    // Generate models layout
    const modelsLayoutContent = await format(modelsLayout, {
      semi: true,
      trailingComma: 'all',
      singleQuote: true,
      printWidth: 120,
      tabWidth: 2,
      parser: 'babel-ts',
    });
    createFile(`${outputPath}models/`, 'layout.tsx', modelsLayoutContent);
  }
}

// Pages Router template (existing)
const pagesRouterPage = `
import React from 'react';
import PrismaTable from 'components/PrismaTable';

const #{id}: React.FC = () => {
  return <PrismaTable model="#{id}" />;
};

export default #{id};
`;

// App Router template (new)
const appRouterPage = `
import React from 'react';
import PrismaTable from 'components/PrismaTable';

export default function #{id}Page() {
  return <PrismaTable model="#{id}" />;
}
`;

// App Router admin layout template
const adminLayout = `
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}
`;

// App Router models layout template
const modelsLayout = `
import React from 'react';

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="models-layout">
      {children}
    </div>
  );
}
`;
