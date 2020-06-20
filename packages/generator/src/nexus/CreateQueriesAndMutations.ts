import { Options, Query, Mutation } from '@paljs/types';
import { getCrud } from './templates';
import { writeFileSync } from 'fs';
import { createFileIfNotfound, formation } from '../fs';

const queries: Query[] = ['findOne', 'findMany', 'findCount'];
const mutations: Mutation[] = [
  'createOne',
  'updateOne',
  'upsertOne',
  'deleteOne',
  'updateMany',
  'deleteMany',
];

export function createQueriesAndMutations(name: string, options: Options) {
  const exclude = options.excludeQueriesAndMutations.concat(
    options.excludeQueriesAndMutationsByModel[name] ?? [],
  );
  let modelIndex = '';
  if (
    !options.disableQueries &&
    !options.excludeModels.find((item) => item.name === name && item.queries)
  ) {
    let queriesIndex = '';
    const path = `${options.output}/${name}/queries`;
    queries
      .filter((item) => !exclude.includes(item))
      .map((item) => {
        const itemContent = getCrud(
          name,
          'query',
          item,
          options.onDelete,
          options.nexusSchema,
        );
        createFileIfNotfound(path, `${item}.ts`, formation(itemContent));
        queriesIndex += `export * from './${item}'
`;
      });
    if (queriesIndex && options.nexusSchema) {
      modelIndex += `export * from './queries'
`;
      writeFileSync(`${path}/index.ts`, formation(queriesIndex));
    }
  }

  if (
    !options.disableMutations &&
    !options.excludeModels.find((item) => item.name === name && item.mutations)
  ) {
    let mutationsIndex = '';
    const path = `${options.output}/${name}/mutations`;
    mutations
      .filter((item) => !exclude.includes(item))
      .map((item) => {
        const itemContent = getCrud(
          name,
          'mutation',
          item,
          options.onDelete,
          options.nexusSchema,
        );
        createFileIfNotfound(path, `${item}.ts`, formation(itemContent));
        mutationsIndex += `export * from './${item}'
`;
      });
    if (mutationsIndex && options.nexusSchema) {
      modelIndex += `export * from './mutations'`;
      writeFileSync(`${path}/index.ts`, formation(mutationsIndex));
    }
  }
  return modelIndex;
}
