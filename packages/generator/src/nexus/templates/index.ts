import findOne from './findOne';
import findMany from './findMany';
import findCount from './findCount';
import createOne from './createOne';
import updateOne from './updateOne';
import deleteOne from './deleteOne';
import upsertOne from './upsertOne';
import deleteMany from './deleteMany';
import updateMany from './updateMany';
import aggregate from './aggregate';
import { QueriesAndMutations } from '@paljs/types';

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
  aggregate,
};

export function getCrud(
  model: string,
  type: 'query' | 'mutation',
  key: QueriesAndMutations,
  onDelete?: boolean,
  schema?: boolean,
  isJS?: boolean,
) {
  function getImport(content: string, path: string) {
    return isJS
      ? `const ${content} = require('${path}')`
      : `import ${content} from '${path}'`;
  }
  const modelLower = model.charAt(0).toLowerCase() + model.slice(1);
  const importString = schema
    ? getImport(
        `{ ${type === 'query' ? 'queryField' : 'mutationField'}, arg }`,
        '@nexus/schema',
      )
    : getImport('{ schema }', 'nexus');
  return crud[key](schema)
    .replace(/#{Model}/g, model)
    .replace(/#{model}/g, modelLower)
    .replace(/#{import}/g, importString)
    .replace(/#{schema}/g, schema ? '' : 'schema.')
    .replace(/#{exportTs}/g, isJS ? '' : 'export ')
    .replace(/#{exportJs}/g, isJS ? `module.exports = {${model}}` : '')
    .replace(
      /#{onDelete}/g,
      onDelete ? `await prisma.onDelete({ model: '${model}', where })` : '',
    );
}
