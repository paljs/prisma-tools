import { QueriesAndMutations } from '@paljs/types';
import { GenerateSdl } from '.';

export async function createQueriesAndMutations(
  modelName: string,
  exclude: QueriesAndMutations[],
  generator: GenerateSdl,
) {
  const operations = {
    queries: {
      type: 'type Query {',
      resolver: 'Query: {',
    },
    mutations: {
      type: 'type Mutation {',
      resolver: 'Mutation: {',
    },
  };
  const args = async (key: QueriesAndMutations) =>
    await generator.getInputTypes(
      generator.queries.includes(key as any) ? 'Query' : 'Mutation',
      key + name,
    );
  const model = modelName.charAt(0).toLowerCase() + modelName.slice(1);
  const name = modelName.charAt(0).toUpperCase() + modelName.slice(1);
  const prismaName = generator.options.prismaName;
  if (!exclude.includes('findUnique')) {
    operations.queries.type += `
    findUnique${name}(${await args('findUnique')}): ${modelName}`;
    operations.queries.resolver += `
    findUnique${name}: (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.findUnique(args)
    },`;
  }

  if (!exclude.includes('findFirst')) {
    operations.queries.type += `
    findFirst${name}(${await args('findFirst')}): ${modelName}`;
    operations.queries.resolver += `
    findFirst${name}: (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.findFirst(args)
    },`;
  }

  if (!exclude.includes('findMany')) {
    operations.queries.type += `
    findMany${name}(${await args('findMany')}): [${modelName}!]`;
    operations.queries.resolver += `
    findMany${name}: (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.findMany(args)
    },`;
  }

  if (!exclude.includes('findCount')) {
    operations.queries.type += `
    findMany${name}Count(${await args('findMany')}): Int!`;
    operations.queries.resolver += `
    findMany${name}Count: (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.count(args)
    },`;
  }

  if (!exclude.includes('aggregate')) {
    operations.queries.type += `
    aggregate${name}(${await args('aggregate')}): Aggregate${name}`;
    operations.queries.resolver += `
    aggregate${name}: (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.aggregate(args)
    },`;
  }

  if (!exclude.includes('createOne')) {
    operations.mutations.type += `
    createOne${name}(${await args('createOne')}): ${name}!`;
    operations.mutations.resolver += `
    createOne${name}: (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.create(args)
    },`;
  }

  if (!exclude.includes('updateOne')) {
    operations.mutations.type += `
    updateOne${name}(${await args('updateOne')}): ${modelName}!`;
    operations.mutations.resolver += `
    updateOne${name}: (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.update(args)
    },`;
  }

  if (!exclude.includes('deleteOne')) {
    operations.mutations.type += `
    deleteOne${name}(${await args('deleteOne')}): ${modelName}`;
    operations.mutations.resolver += `
    deleteOne${name}: async (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.delete(args)
    },`;
  }

  if (!exclude.includes('upsertOne')) {
    operations.mutations.type += `
    upsertOne${name}(${await args('upsertOne')}): ${modelName}`;
    operations.mutations.resolver += `
    upsertOne${name}: async (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.upsert(args)
    },`;
  }

  if (!exclude.includes('deleteMany')) {
    operations.mutations.type += `
    deleteMany${name}(${await args('deleteMany')}): BatchPayload`;
    operations.mutations.resolver += `
    deleteMany${name}: async (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.deleteMany(args)
    },`;
  }

  if (!exclude.includes('updateMany')) {
    operations.mutations.type += `
    updateMany${name}(${await args('updateMany')}): BatchPayload`;
    operations.mutations.resolver += `
    updateMany${name}: (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.updateMany(args)
    },`;
  }

  operations.queries.type += `
}\n\n`;
  operations.queries.resolver += `
},`;
  operations.mutations.type += `
}`;
  operations.mutations.resolver += `
}`;
  return operations;
}
