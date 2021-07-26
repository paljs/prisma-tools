import { QueriesAndMutations } from '@paljs/types';
import { ConfigMetaFormat, extractPreviewFeatures } from '@prisma/sdk';

export function createQueriesAndMutations(
  modelName: string,
  exclude: QueriesAndMutations[],
  schemaConfig: ConfigMetaFormat,
) {
  const operations = {
    queries: {
      type: 'extend type Query {',
      resolver: 'Query: {',
    },
    mutations: {
      type: 'extend type Mutation {',
      resolver: 'Mutation: {',
    },
  };

  const model = modelName.charAt(0).toLowerCase() + modelName.slice(1);
  const name = modelName.charAt(0).toUpperCase() + modelName.slice(1);
  const previewFeatures = extractPreviewFeatures(schemaConfig);
  const orderBy = previewFeatures.includes('orderByRelation')
    ? 'WithRelation'
    : '';

  if (!exclude.includes('findUnique')) {
    operations.queries.type += `
    findUnique${name}(where: ${name}WhereUniqueInput!): ${modelName}`;
    operations.queries.resolver += `
    findUnique${name}: (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).${model}.findUnique(args);
    },`;
  }

  if (!exclude.includes('findFirst')) {
    operations.queries.type += `
    findFirst${name}(
      where: ${name}WhereInput
      orderBy: [${name}OrderBy${orderBy}Input!]
      cursor: ${name}WhereUniqueInput
      distinct: ${name}ScalarFieldEnum
      skip: Int
      take: Int
    ): ${modelName}`;
    operations.queries.resolver += `
    findFirst${name}: (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).${model}.findFirst(args);
    },`;
  }

  if (!exclude.includes('findMany')) {
    operations.queries.type += `
    findMany${name}(
      where: ${name}WhereInput
      orderBy: [${name}OrderBy${orderBy}Input!]
      cursor: ${name}WhereUniqueInput
      distinct: ${name}ScalarFieldEnum
      skip: Int
      take: Int
    ): [${modelName}!]`;
    operations.queries.resolver += `
    findMany${name}: (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).${model}.findMany(args);
    },`;
  }

  if (!exclude.includes('findCount')) {
    operations.queries.type += `
    findMany${name}Count(
      where: ${name}WhereInput
      orderBy: [${name}OrderBy${orderBy}Input!]
      cursor: ${name}WhereUniqueInput
      distinct: ${name}ScalarFieldEnum
      skip: Int
      take: Int
    ): Int!`;
    operations.queries.resolver += `
    findMany${name}Count: (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).${model}.count(args);
    },`;
  }

  if (!exclude.includes('aggregate')) {
    operations.queries.type += `
    aggregate${name}(
      where: ${name}WhereInput
      orderBy: [${name}OrderBy${orderBy}Input!]
      cursor: ${name}WhereUniqueInput
      distinct: ${name}ScalarFieldEnum
      skip: Int
      take: Int
    ): Aggregate${name}`;
    operations.queries.resolver += `
    aggregate${name}: (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).${model}.aggregate(args);
    },`;
  }

  if (!exclude.includes('createOne')) {
    operations.mutations.type += `
    createOne${name}(data: ${name}CreateInput!): ${modelName}!`;
    operations.mutations.resolver += `
    createOne${name}: (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).${model}.create(args);
    },`;
  }

  if (!exclude.includes('updateOne')) {
    operations.mutations.type += `
    updateOne${name}(
      where: ${name}WhereUniqueInput!
      data: ${name}UpdateInput!
    ): ${modelName}!`;
    operations.mutations.resolver += `
    updateOne${name}: (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).${model}.update(args);
    },`;
  }

  if (!exclude.includes('deleteOne')) {
    operations.mutations.type += `
    deleteOne${name}(where: ${name}WhereUniqueInput!): ${modelName}`;
    operations.mutations.resolver += `
    deleteOne${name}: async (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).${model}.delete(args);
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
    upsertOne${name}: async (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).${model}.upsert(args);
    },`;
  }

  if (!exclude.includes('deleteMany')) {
    operations.mutations.type += `
    deleteMany${name}(where: ${name}WhereInput): BatchPayload`;
    operations.mutations.resolver += `
    deleteMany${name}: async (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).${model}.deleteMany(args);
    },`;
  }

  if (!exclude.includes('updateMany')) {
    operations.mutations.type += `
    updateMany${name}(
      where: ${name}WhereInput
      data: ${name}UpdateManyMutationInput
    ): BatchPayload`;
    operations.mutations.resolver += `
    updateMany${name}: (_parent, args, { injector }: GraphQLModules.Context) => {
      return injector.get(PrismaProvider).${model}.updateMany(args);
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
