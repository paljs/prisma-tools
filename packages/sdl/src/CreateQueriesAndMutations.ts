import { QueriesAndMutationsOptions } from "./types";

export function createQueriesAndMutations(
  name: string,
  options: QueriesAndMutationsOptions
) {
  const exclude = options.excludeQueriesAndMutations.concat(
    options.excludeQueriesAndMutationsByModel[name] ?? []
  );
  const model = name.charAt(0).toLowerCase() + name.slice(1);
  const operations = {
    queries: {
      type: "type Query {",
      resolver: "Query: {",
    },
    mutations: {
      type: "type Mutation {",
      resolver: "Mutation: {",
    },
  };

  if (!exclude.includes("findOne")) {
    operations.queries.type += `
    findOne${name}(where: ${name}WhereUniqueInput!): ${name}`;
    operations.queries.resolver += `
    findOne${name}: (_parent, { where }, {prisma, select}: Context) => {
      return prisma.${model}.findOne({
        where,
        ...select,
      })
    },`;
  }

  if (!exclude.includes("findMany")) {
    operations.queries.type += `
    findMany${name}(
      where: ${name}WhereInput
      orderBy: ${name}OrderByInput
      after: ${name}WhereUniqueInput
      before: ${name}WhereUniqueInput
      skip: Int
      first: Int
      last: Int
    ): [${name}!]`;
    operations.queries.resolver += `
    findMany${name}: (_parent, args, {prisma, select}: Context) => {
      return prisma.${model}.findMany({
        ...args,
        ...select,
      })
    },`;
  }

  if (!exclude.includes("findCount")) {
    operations.queries.type += `
    findMany${name}Count(
      where: ${name}WhereInput
      orderBy: ${name}OrderByInput
      after: ${name}WhereUniqueInput
      before: ${name}WhereUniqueInput
      skip: Int
      first: Int
      last: Int
    ): Int!`;
    operations.queries.resolver += `
    findMany${name}Count: (_parent, args, {prisma}: Context) => {
      return prisma.${model}.count(args)
    },`;
  }

  if (!exclude.includes("createOne")) {
    operations.mutations.type += `
    createOne${name}(data: ${name}CreateInput!): ${name}!`;
    operations.mutations.resolver += `
    createOne${name}: (_parent, args, {prisma, select}: Context) => {
      return prisma.${model}.create({
        ...args,
        ...select,
      })
    },`;
  }

  if (!exclude.includes("updateOne")) {
    operations.mutations.type += `
    updateOne${name}(
      where: ${name}WhereUniqueInput!
      data: ${name}UpdateInput!
    ): ${name}!`;
    operations.mutations.resolver += `
    updateOne${name}: (_parent, args, {prisma, select}: Context) => {
      return prisma.${model}.update({
        ...args,
        ...select,
      })
    },`;
  }

  if (!exclude.includes("deleteOne")) {
    operations.mutations.type += `
    deleteOne${name}(where: ${name}WhereUniqueInput!): ${name}`;
    operations.mutations.resolver += `
    deleteOne${name}: async (_parent, {where}, {prisma, select${
      options.onDelete ? ", onDelete" : ""
    }}: Context) => {
      ${
        options.onDelete
          ? `await onDelete.cascade('${name}', where, false)`
          : ""
      }
      return prisma.${model}.delete({
        where,
        ...select,
      })
    },`;
  }

  if (!exclude.includes("deleteMany")) {
    operations.mutations.type += `
    deleteMany${name}(where: ${name}WhereInput): BatchPayload`;
    operations.mutations.resolver += `
    deleteMany${name}: async (_parent, {where}, {prisma${
      options.onDelete ? ", onDelete" : ""
    }}: Context) => {
      ${
        options.onDelete
          ? `await onDelete.cascade('${name}', where, false)`
          : ""
      }
      return prisma.${model}.deleteMany({where})
    },`;
  }

  if (!exclude.includes("updateMany")) {
    operations.mutations.type += `
    updateMany${name}(
      where: ${name}WhereInput
      data: ${name}UpdateManyMutationInput
    ): BatchPayload`;
    operations.mutations.resolver += `
    updateMany${name}: (_parent, args, {prisma}: Context) => {
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
