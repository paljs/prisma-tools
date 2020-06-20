import { Options } from '@paljs/types';
import { writeFileSync, mkdirSync } from 'fs';
import { schema, datamodel, DMMF } from '../schema';
import { createQueriesAndMutations } from './CreateQueriesAndMutations';
import { formation } from '../fs';

const defaultOptions: Options = {
  output: 'src/app/',
  excludeFields: [],
  excludeModels: [],
  excludeFieldsByModel: {},
  excludeQueriesAndMutations: [],
  excludeQueriesAndMutationsByModel: {},
};

export function createModules(customOptions: Partial<Options>) {
  const options: Options = { ...defaultOptions, ...customOptions };
  let appModules: string[] = ['CommonModule'];
  let appImports = '';
  schema.outputTypes.forEach((model) => {
    let imports = '';
    let modules: string[] = ['CommonModule'];
    let extendsTypes = '';
    if (
      !['Query', 'Mutation'].includes(model.name) &&
      !model.name.startsWith('Aggregate') &&
      model.name !== 'BatchPayload'
    ) {
      appModules.push(model.name + 'Module');
      appImports += `import { ${model.name}Module } from './${model.name}/${model.name}.module';
      `;
      let fileContent = `type ${model.name} {`;
      const excludeFields = options.excludeFields.concat(
        options.excludeFieldsByModel[model.name],
      );
      const dataModel = datamodel.models.find(
        (item) => item.name === model.name,
      );
      model.fields.forEach((field) => {
        if (!excludeFields.includes(field.name)) {
          const dataField = dataModel?.fields.find(
            (item) => item.name === field.name,
          );
          if (
            dataField?.kind === 'object' &&
            dataField.relationFromFields.length > 0
          ) {
            if (!modules.includes(dataField.type + 'Module')) {
              modules.push(dataField.type + 'Module');
              imports += `import { ${dataField.type}Module } from '../${dataField.type}/${dataField.type}.module';
              `;
              extendsTypes += `extend type ${dataField.type} {`;
              schema.outputTypes
                .find((item) => item.name === dataField.type)
                ?.fields.filter((item) => item.outputType.type === model.name)
                .forEach((item) => {
                  extendsTypes = getField(item, extendsTypes);
                });

              extendsTypes += `}
              
              `;
            }

            fileContent = getField(field, fileContent);
          } else if (
            dataField?.kind !== 'object' ||
            modules.includes(dataField.type + 'Module')
          ) {
            fileContent = getField(field, fileContent);
          }
        }
      });
      fileContent += `}
  
`;

      fileContent += extendsTypes;

      const operations = createQueriesAndMutations(model.name, options);

      mkdirSync(`${options.output}/${model.name}`, { recursive: true });
      let resolvers = '';
      let resolversComposition = '';

      if (
        !options.disableQueries &&
        !options.excludeModels.find(
          (item) => item.name === model.name && item.queries,
        )
      ) {
        resolvers += operations.queries.resolver;
        fileContent += operations.queries.type;
        resolversComposition += `Query: [addSelect],`;
      }
      if (
        !options.disableMutations &&
        !options.excludeModels.find(
          (item) => item.name === model.name && item.mutations,
        )
      ) {
        resolvers += operations.mutations.resolver;
        fileContent += operations.mutations.type;
        resolversComposition += `Mutation: [addSelect],`;
      }

      if (resolvers) {
        resolvers = `import { ModuleContext } from '@graphql-modules/core';
        import { PrismaProvider } from '../common/Prisma.provider';
      
      export default {
        ${resolvers}
      }
        `;
        writeFileSync(
          `${options.output}/${model.name}/resolvers.ts`,
          formation(resolvers, 'babel-ts'),
        );
      }

      fileContent = `import gql from 'graphql-tag';

      export default gql\`
      ${fileContent}
      \`;
      `;

      writeFileSync(
        `${options.output}/${model.name}/typeDefs.ts`,
        formation(fileContent, 'babel-ts'),
      );

      writeFileSync(
        `${options.output}/${model.name}/${model.name}.module.ts`,
        formation(
          getModule(model.name, imports, modules, resolversComposition),
          'babel-ts',
        ),
      );
    }
  });

  writeFileSync(
    `${options.output}/app.module.ts`,
    formation(AppModule(appImports, appModules), 'babel-ts'),
  );
}

const getModule = (
  name: string,
  imports: string,
  modules: string[],
  resolversComposition: string,
) => {
  return `import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { addSelect } from '../common/addSelect';
import { CommonModule } from '../common/common.module';
${imports}

export const ${name}Module = new GraphQLModule({
  name: '${name}',
  typeDefs,
  resolvers,
  imports: ${JSON.stringify(modules).replace(/"/g, '')},
  ${
    resolversComposition
      ? `resolversComposition: {
    ${resolversComposition}
  },
  `
      : ''
  }
});
`;
};

const AppModule = (imports: string, modules: string[]) => {
  return `import { GraphQLModule } from '@graphql-modules/core';
  import { CommonModule } from './common/common.module';
  ${imports}

  export const AppModule = new GraphQLModule({
    imports: ${JSON.stringify(modules).replace(/"/g, '')},
  });
  `;
};

const getField = (field: DMMF.SchemaField, content: string) => {
  content += `
    ${field.name}`;
  if (field.args.length > 0) {
    content += '(';
    field.args.forEach((arg) => {
      content += `${arg.name}: ${arg.inputType[0].type}
              `;
    });
    content += ')';
  }
  content += `: ${
    field.outputType.isList
      ? `[${field.outputType.type}!]!`
      : field.outputType.type + (field.outputType.isRequired ? '!' : '')
  }`;
  return content;
};
