import { Options } from './types';
import { writeFile, mkdir } from 'fs';
import { schema } from './schema';
import { format } from 'prettier';
import { createQueriesAndMutations } from './CreateQueriesAndMutations';
import { createInput } from './InputTypes';
import { GraphQLSchema, printSchema } from 'graphql';

const defaultOptions: Options = {
  modelsOutput: 'src/graphql/models',
  fieldsExclude: [],
  modelsExclude: [],
  excludeFieldsByModel: {},
  excludeQueriesAndMutations: [],
  excludeQueriesAndMutationsByModel: {},
};
interface Index {
  import: string;
  export: string[];
}
export function createTypes(customOptions: Partial<Options>) {
  const options: Options = { ...defaultOptions, ...customOptions };
  writeFile(
    `${options.modelsOutput}/inputTypes.ts`,
    formatter(createInput()),
    () => {},
  );
  if (options.onlyInputType) {
    return;
  }

  let resolversIndex: Index = {
    import: '',
    export: [],
  };
  let typeDefs: Index = {
    import: `import { mergeTypes } from 'merge-graphql-schemas';
    import inputTypes from './inputTypes'
    `,
    export: ['inputTypes'],
  };
  schema.outputTypes.forEach((model) => {
    if (
      !['Query', 'Mutation'].includes(model.name) &&
      !model.name.startsWith('Aggregate') &&
      model.name !== 'BatchPayload'
    ) {
      let fileContent = `type ${model.name} {`;
      const fieldsExclude = options.fieldsExclude.concat(
        options.excludeFieldsByModel[model.name],
      );
      model.fields.forEach((field) => {
        if (!fieldsExclude.includes(field.name)) {
          fileContent += `
          ${field.name}`;
          if (field.args.length > 0) {
            fileContent += '(';
            field.args.forEach((arg) => {
              fileContent += `${arg.name}: ${arg.inputType[0].type}
              `;
            });
            fileContent += ')';
          }
          fileContent += `: ${
            field.outputType.isList
              ? `[${field.outputType.type}!]!`
              : field.outputType.type + (field.outputType.isRequired ? '!' : '')
          }`;
        }
      });
      fileContent += `}
  
`;
      const operations = createQueriesAndMutations(model.name, options);

      mkdir(`${options.modelsOutput}/${model.name}`, () => {});
      let resolvers = '';

      if (
        !options.disableQueries &&
        !options.modelsExclude.find(
          (item) => item.name === model.name && item.queries,
        )
      ) {
        resolvers += operations.queries.resolver;
        fileContent += operations.queries.type;
      }
      if (
        !options.disableMutations &&
        !options.modelsExclude.find(
          (item) => item.name === model.name && item.mutations,
        )
      ) {
        resolvers += operations.mutations.resolver;
        fileContent += operations.mutations.type;
      }

      if (resolvers) {
        resolvers = `import { Context } from '../../../context'
      
      export default {
        ${resolvers}
      }
        `;
        writeFile(
          `${options.modelsOutput}/${model.name}/resolvers.ts`,
          formatter(resolvers),
          () => {},
        );

        resolversIndex.import += `import ${model.name} from './${model.name}/resolvers'
        `;
        resolversIndex.export.push(model.name);
      }

      fileContent = `import gql from 'graphql-tag';

      export default gql\`
      ${fileContent}
      \`;
      `;

      typeDefs.import += `import ${model.name} from './${model.name}/typeDefs'
        `;
      typeDefs.export.push(model.name);

      writeFile(
        `${options.modelsOutput}/${model.name}/typeDefs.ts`,
        formatter(fileContent),
        () => {},
      );
    }
  });

  writeFile(
    `${options.modelsOutput}/resolvers.ts`,
    formatter(`${resolversIndex.import}

    export default ${JSON.stringify(resolversIndex.export).replace(/"/g, '')}
    `),
    () => {},
  );

  writeFile(
    `${options.modelsOutput}/typeDefs.ts`,
    formatter(`${typeDefs.import}

    export default mergeTypes(${JSON.stringify(typeDefs.export).replace(
      /"/g,
      '',
    )})
    `),
    () => {},
  );
}

const formatter = (content: string) => {
  return format(content, {
    singleQuote: true,
    trailingComma: 'all',
    parser: 'babel-ts',
  });
};

export const generateGraphQlSDLFile = (
  schema: GraphQLSchema,
  path: string = 'schema.graphql',
) => {
  writeFile(path, printSchema(schema), () => {});
};
