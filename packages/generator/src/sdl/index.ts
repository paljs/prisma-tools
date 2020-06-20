import { Options } from '@paljs/types';
import { writeFileSync, mkdirSync } from 'fs';
import { schema } from '../schema';
import { createQueriesAndMutations } from './CreateQueriesAndMutations';
import { formation } from '../fs';

const defaultOptions: Options = {
  output: 'src/graphql/models',
  excludeFields: [],
  excludeModels: [],
  excludeFieldsByModel: {},
  excludeQueriesAndMutations: [],
  excludeQueriesAndMutationsByModel: {},
};
interface Index {
  import: string;
  export: string[];
}
export function createSdl(customOptions: Partial<Options>) {
  const options: Options = { ...defaultOptions, ...customOptions };

  let resolversIndex: Index = {
    import: '',
    export: [],
  };
  let typeDefs: Index = {
    import: `import { mergeTypes } from 'merge-graphql-schemas';
    import {sdlInputs} from '@paljs/plugins'
    `,
    export: ['sdlInputs'],
  };
  schema.outputTypes.forEach((model) => {
    if (
      !['Query', 'Mutation'].includes(model.name) &&
      !model.name.startsWith('Aggregate') &&
      model.name !== 'BatchPayload' &&
      (!options.models || options.models.includes(model.name))
    ) {
      let fileContent = `type ${model.name} {`;
      const excludeFields = options.excludeFields.concat(
        options.excludeFieldsByModel[model.name],
      );
      model.fields.forEach((field) => {
        if (!excludeFields.includes(field.name)) {
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

      mkdirSync(`${options.output}/${model.name}`, { recursive: true });
      let resolvers = '';

      if (
        !options.disableQueries &&
        !options.excludeModels.find(
          (item) => item.name === model.name && item.queries,
        )
      ) {
        resolvers += operations.queries.resolver;
        fileContent += operations.queries.type;
      }
      if (
        !options.disableMutations &&
        !options.excludeModels.find(
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
        writeFileSync(
          `${options.output}/${model.name}/resolvers.ts`,
          formation(resolvers, 'babel-ts'),
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

      writeFileSync(
        `${options.output}/${model.name}/typeDefs.ts`,
        formation(fileContent, 'babel-ts'),
      );
    }
  });
  writeFileSync(
    options.output,
    'resolvers.ts',
    formation(
      `${resolversIndex.import}

    export default ${JSON.stringify(resolversIndex.export).replace(/"/g, '')}
    `,
      'babel-ts',
    ),
  );

  writeFileSync(
    `${options.output}/typeDefs.ts`,
    formation(
      `${typeDefs.import}

    export default mergeTypes(${JSON.stringify(typeDefs.export).replace(
      /"/g,
      '',
    )})
    `,
      'babel-ts',
    ),
  );
}
