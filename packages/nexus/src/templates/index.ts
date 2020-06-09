import findOne from './findOne';
import findMany from './findMany';
import findCount from './findCount';
import createOne from './createOne';
import updateOne from './updateOne';
import deleteOne from './deleteOne';
import upsertOne from './upsertOne';
import deleteMany from './deleteMany';
import updateMany from './updateMany';
import { QueriesAndMutations } from '../types';

const crud: { [key in QueriesAndMutations]: (schema?: boolean) => string } = {
  findOne,
  findMany,
  findCount,
  createOne,
  updateOne,
  deleteOne,
  upsertOne,
  deleteMany,
  updateMany,
};

export function getCrud(
  model: string,
  type: 'query' | 'mutation',
  key: QueriesAndMutations,
  onDelete?: boolean,
  schema?: boolean,
) {
  const modelLower = model.charAt(0).toLowerCase() + model.slice(1);
  const importString = schema
    ? `import { ${
        type === 'query' ? 'mutationField' : 'queryField'
      }, arg } from '@nexus/schema'`
    : `import { schema } from 'nexus'`;
  return crud[key](schema)
    .replace(/#{Model}/g, model)
    .replace(/#{model}/g, modelLower)
    .replace(/#{import}/g, importString)
    .replace(/#{schema}/g, schema ? '' : 'schema.')
    .replace(
      /#{onDelete}/g,
      onDelete ? `await prisma.onDelete({ model: '${model}', where })` : '',
    );
}
