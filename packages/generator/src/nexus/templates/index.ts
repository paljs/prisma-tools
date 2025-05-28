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
import { GenerateNexus } from '..';

const crud: Record<QueriesAndMutations, string> = {
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

export async function getCrud(
  model: string,
  type: 'query' | 'mutation',
  key: QueriesAndMutations,
  generator: GenerateNexus,
) {
  function getImport(content: string, path: string) {
    return generator.isJS ? `const ${content} = require('${path}')` : `import ${content} from '${path}'`;
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
  const modelUpper = capital(model);
  const importString = getImport(`{ ${type === 'query' ? 'queryField' : 'mutationField'}${getImportArgs()} }`, 'nexus');
  const args = await generator.getInputTypes(capital(type), (key === 'findCount' ? 'findMany' : key) + model, false);
  return crud[key]
    .replace(/#{ModelName}/g, model)
    .replace(/#{args}/g, args)
    .replace(/#{prisma}/g, generator.options.prismaName)
    .replace(/#{Model}/g, modelUpper)
    .replace(/#{model}/g, modelLower)
    .replace(/#{import}/g, importString)
    .replace(/#{as}/g, generator.isJS ? '' : ' as any')
    .replace(/#{exportTs}/g, generator.isJS ? '' : 'export ')
    .replace(/#{exportJs}/g, generator.isJS ? `module.exports = {${modelUpper}${capital(key)}${capital(type)}}` : '');
}
