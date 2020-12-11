import { QueriesAndMutations } from '@paljs/types';

export function createQueriesAndMutations(
  name: string,
  model: string,
  exclude: QueriesAndMutations[],
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

  if (!exclude.includes('findUnique')) {
    operations.queries.type += `
    findUnique${name}(where: ${name}WhereUniqueInput!): ${name}`;
    operations.queries.resolver += `
    findUnique${name}: (_parent, args, {prisma}) => {
      return prisma.${model}.findUnique(args)
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
    ): [${name}!]`;
    operations.queries.resolver += `
    findFirst${name}: (_parent, args, {prisma}) => {
      return prisma.${model}.findFirst(args)
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
    ): [${name}!]`;
    operations.queries.resolver += `
    findMany${name}: (_parent, args, {prisma}) => {
      return prisma.${model}.findMany(args)
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
    findMany${name}Count: (_parent, args, {prisma}) => {
      return prisma.${model}.count(args)
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
    aggregate${name}: (_parent, args, {prisma}) => {
      return prisma.${model}.aggregate(args)
    },`;
  }

  if (!exclude.includes('createOne')) {
    operations.mutations.type += `
    createOne${name}(data: ${name}CreateInput!): ${name}!`;
    operations.mutations.resolver += `
    createOne${name}: (_parent, args, {prisma}) => {
      return prisma.${model}.create(args)
    },`;
  }

  if (!exclude.includes('updateOne')) {
    operations.mutations.type += `
    updateOne${name}(
      where: ${name}WhereUniqueInput!
      data: ${name}UpdateInput!
    ): ${name}!`;
    operations.mutations.resolver += `
    updateOne${name}: (_parent, args, {prisma}) => {
      return prisma.${model}.update(args)
    },`;
  }

  if (!exclude.includes('deleteOne')) {
    operations.mutations.type += `
    deleteOne${name}(where: ${name}WhereUniqueInput!): ${name}`;
    operations.mutations.resolver += `
    deleteOne${name}: async (_parent, args, {prisma}) => {
      ${
        onDelete
          ? `await prisma.onDelete({ model: '${name}', where: args.where })`
          : ''
      }
      return prisma.${model}.delete(args)
    },`;
  }

  if (!exclude.includes('upsertOne')) {
    operations.mutations.type += `
    upsertOne${name}(
      where: ${name}WhereUniqueInput!
      create: ${name}CreateInput!
      update: ${name}UpdateInput!
    ): ${name}`;
    operations.mutations.resolver += `
    upsertOne${name}: async (_parent, args, {prisma}) => {
      return prisma.${model}.upsert(args)
    },`;
  }

  if (!exclude.includes('deleteMany')) {
    operations.mutations.type += `
    deleteMany${name}(where: ${name}WhereInput): BatchPayload`;
    operations.mutations.resolver += `
    deleteMany${name}: async (_parent, args, {prisma}) => {
      ${
        onDelete
          ? `await prisma.onDelete({ model: '${name}', where: args.where })`
          : ''
      }
      return prisma.${model}.deleteMany(args)
    },`;
  }

  if (!exclude.includes('updateMany')) {
    operations.mutations.type += `
    updateMany${name}(
      where: ${name}WhereInput
      data: ${name}UpdateManyMutationInput
    ): BatchPayload`;
    operations.mutations.resolver += `
    updateMany${name}: (_parent, args, {prisma}) => {
      return prisma.${model}.updateMany(args)
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
