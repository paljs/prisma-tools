import { QueriesAndMutations } from '@paljs/types';

export function createQueriesAndMutations(
  modelName: string,
  exclude: QueriesAndMutations[],
  prismaName: string,
  onDelete?: boolean,
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

  const model = modelName.charAt(0).toLowerCase() + modelName.slice(1);
  const name = modelName.charAt(0).toUpperCase() + modelName.slice(1);

  if (!exclude.includes('findUnique')) {
    operations.queries.type += `
    findUnique${name}(where: ${name}WhereUniqueInput!): ${modelName}`;
    operations.queries.resolver += `
    findUnique${name}: (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.findUnique(args)
    },`;
  }

  if (!exclude.includes('findFirst')) {
    operations.queries.type += `
    findFirst${name}(
      where: ${name}WhereInput
      orderBy: [${name}OrderByInput!]
      cursor: ${name}WhereUniqueInput
      distinct: ${name}ScalarFieldEnum
      skip: Int
      take: Int
    ): ${modelName}`;
    operations.queries.resolver += `
    findFirst${name}: (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.findFirst(args)
    },`;
  }

  if (!exclude.includes('findMany')) {
    operations.queries.type += `
    findMany${name}(
      where: ${name}WhereInput
      orderBy: [${name}OrderByInput!]
      cursor: ${name}WhereUniqueInput
      distinct: ${name}ScalarFieldEnum
      skip: Int
      take: Int
    ): [${modelName}!]`;
    operations.queries.resolver += `
    findMany${name}: (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.findMany(args)
    },`;
  }

  if (!exclude.includes('findCount')) {
    operations.queries.type += `
    findMany${name}Count(
      where: ${name}WhereInput
      orderBy: [${name}OrderByInput!]
      cursor: ${name}WhereUniqueInput
      distinct: ${name}ScalarFieldEnum
      skip: Int
      take: Int
    ): Int!`;
    operations.queries.resolver += `
    findMany${name}Count: (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.count(args)
    },`;
  }

  if (!exclude.includes('aggregate')) {
    operations.queries.type += `
    aggregate${name}(
      where: ${name}WhereInput
      orderBy: [${name}OrderByInput!]
      cursor: ${name}WhereUniqueInput
      distinct: ${name}ScalarFieldEnum
      skip: Int
      take: Int
    ): Aggregate${name}`;
    operations.queries.resolver += `
    aggregate${name}: (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.aggregate(args)
    },`;
  }

  if (!exclude.includes('createOne')) {
    operations.mutations.type += `
    createOne${name}(data: ${name}CreateInput!): ${name}!`;
    operations.mutations.resolver += `
    createOne${name}: (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.create(args)
    },`;
  }

  if (!exclude.includes('updateOne')) {
    operations.mutations.type += `
    updateOne${name}(
      where: ${name}WhereUniqueInput!
      data: ${name}UpdateInput!
    ): ${modelName}!`;
    operations.mutations.resolver += `
    updateOne${name}: (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.update(args)
    },`;
  }

  if (!exclude.includes('deleteOne')) {
    operations.mutations.type += `
    deleteOne${name}(where: ${name}WhereUniqueInput!): ${modelName}`;
    operations.mutations.resolver += `
    deleteOne${name}: async (_parent, args, {${prismaName}}) => {
      ${
        onDelete
          ? `await ${prismaName}.onDelete({ model: '${modelName}', where: args.where })`
          : ''
      }
      return ${prismaName}.${model}.delete(args)
    },`;
  }

  if (!exclude.includes('upsertOne')) {
    operations.mutations.type += `
    upsertOne${name}(
      where: ${name}WhereUniqueInput!
      create: ${name}CreateInput!
      update: ${name}UpdateInput!
    ): ${modelName}`;
    operations.mutations.resolver += `
    upsertOne${name}: async (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.upsert(args)
    },`;
  }

  if (!exclude.includes('deleteMany')) {
    operations.mutations.type += `
    deleteMany${name}(where: ${name}WhereInput): BatchPayload`;
    operations.mutations.resolver += `
    deleteMany${name}: async (_parent, args, {${prismaName}}) => {
      ${
        onDelete
          ? `await ${prismaName}.onDelete({ model: '${modelName}', where: args.where })`
          : ''
      }
      return ${prismaName}.${model}.deleteMany(args)
    },`;
  }

  if (!exclude.includes('updateMany')) {
    operations.mutations.type += `
    updateMany${name}(
      where: ${name}WhereInput
      data: ${name}UpdateManyMutationInput
    ): BatchPayload`;
    operations.mutations.resolver += `
    updateMany${name}: (_parent, args, {${prismaName}}) => {
      return ${prismaName}.${model}.updateMany(args)
    },`;
  }

  operations.queries.type += `
}`;
  operations.queries.resolver += `
},`;
  operations.mutations.type += `
}`;
  operations.mutations.resolver += `
}`;
  return operations;
}
