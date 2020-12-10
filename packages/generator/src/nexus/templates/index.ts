import findUnique from './findUnique';
import findFirst from './findFirst';
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

const crud: { [key in QueriesAndMutations]: string } = {
  findUnique,
  findFirst,
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

function capital(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getCrud(
  model: string,
  type: 'query' | 'mutation',
  key: QueriesAndMutations,
  onDelete?: boolean,
  isJS?: boolean,
) {
  function getImport(content: string, path: string) {
    return isJS
      ? `const ${content} = require('${path}')`
      : `import ${content} from '${path}'`;
  }
  function getImportArgs() {
    switch (key) {
      case 'aggregate':
      case 'findFirst':
        return ', list';
      case 'findCount':
      case 'findMany':
        return ', nonNull, list';
      case 'findUnique':
      case 'deleteOne':
      case 'deleteMany':
      case 'createOne':
      case 'updateMany':
      case 'updateOne':
      case 'upsertOne':
        return ', nonNull';
    }
  }
  const modelLower = model.charAt(0).toLowerCase() + model.slice(1);
  const importString = getImport(
    `{ ${
      type === 'query' ? 'queryField' : 'mutationField'
    }, arg${getImportArgs()} }`,
    '@nexus/schema',
  );
  return crud[key]
    .replace(/#{Model}/g, model)
    .replace(/#{model}/g, modelLower)
    .replace(/#{import}/g, importString)
    .replace(/#{as}/g, isJS ? '' : ' as any')
    .replace(/#{exportTs}/g, isJS ? '' : 'export ')
    .replace(
      /#{exportJs}/g,
      isJS ? `module.exports = {${model}${capital(key)}${capital(type)}}` : '',
    )
    .replace(
      /#{onDelete}/g,
      onDelete ? `await prisma.onDelete({ model: '${model}', where })` : '',
    );
}
