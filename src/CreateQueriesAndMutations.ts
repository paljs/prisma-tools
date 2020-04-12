import { QueriesAndMutationsOptions } from './types';

export function createQueriesAndMutations(
  name: string,
  options: QueriesAndMutationsOptions
) {
  const exclude = options.excludeQueriesAndMutations.concat(
    options.excludeQueriesAndMutationsByModel[name] ?? []
  );
  const model = name.charAt(0).toLowerCase() + name.slice(1);
  return `export const ${name}Queries = extendType({
  type: 'Query',
  definition(t) {
    ${
      !exclude.includes('findOne')
        ? `
    t.field('findOne${name}', {
      type: '${name}',
      nullable: true,
      args: {
        where: arg({
          type: '${name}WhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_, { where }, {prisma, select}) {
        return prisma.${model}.findOne({
          where,
          ...select,
        })
      },
    })`
        : ''
    }
    ${
      !exclude.includes('findMany')
        ? `
    t.field('findMany${name}', {
      type: '${name}',
      nullable: true,
      list: true,
      args: {
        where: '${name}WhereInput',
        orderBy: '${name}OrderByInput',
        after: '${name}WhereUniqueInput',
        before: '${name}WhereUniqueInput',
        skip: 'Int',
        first: 'Int',
        last: 'Int',
      },
      resolve: async (_root, args, {prisma, select}) => {
        return prisma.${model}.findMany({
          ...args,
          ...select,
        })
      },
    })`
        : ''
    }
    ${
      !exclude.includes('findCount')
        ? `
    t.field('findMany${name}Count', {
      type: 'Int',
      args: {
        where: '${name}WhereInput',
        orderBy: '${name}OrderByInput',
        after: '${name}WhereUniqueInput',
        before: '${name}WhereUniqueInput',
        skip: 'Int',
        first: 'Int',
        last: 'Int',
      },
      resolve: async (_root, args, {prisma}) => {
        return prisma.${model}.count({...args})
      },
    })`
        : ''
    }
    }
    })
  
  export const ${name}Mutations = extendType({
  type: 'Mutation',
  definition(t) {
    ${
      !exclude.includes('createOne')
        ? `
    t.field('createOne${name}', {
      type: '${name}',
      nullable: false,
      args: {
        data: arg({
          type: '${name}CreateInput',
          nullable: false,
        }),
      },
      resolve(_, { data }, {prisma, select}) {
        return prisma.${model}.create({
          data,
          ...select,
        })
      },
    })`
        : ''
    }
    ${
      !exclude.includes('updateOne')
        ? `
    t.field('updateOne${name}', {
      type: '${name}',
      nullable: false,
      args: {
        where: arg({
          type: '${name}WhereUniqueInput',
          nullable: false,
        }),
        data: arg({
          type: '${name}UpdateInput',
          nullable: false,
        }),
      },
      resolve(_, { data, where }, {prisma, select}) {
        return prisma.${model}.update({
          data,
          where,
          ...select,
        })
      },
    })`
        : ''
    }
    ${
      !exclude.includes('deleteOne')
        ? `
    t.field('deleteOne${name}', {
      type: '${name}',
      nullable: true,
      args: {
        where: arg({
          type: '${name}WhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_, { where }, {prisma, select}) {
        return prisma.${model}.delete({
          where,
          ...select,
        })
      },
    })`
        : ''
    }
    ${
      !exclude.includes('deleteMany')
        ? `
    t.field('deleteMany${name}', {
      type: 'BatchPayload',
      args: {
        where: arg({
          type: '${name}WhereInput',
          nullable: true,
        }),
      },
      resolve(_, { where }, {prisma, select}) {
        return prisma.${model}.deleteMany({
          where,
          ...select,
        })
      },
    })`
        : ''
    }
    ${
      !exclude.includes('updateMany')
        ? `
    t.field('updateMany${name}', {
      type: 'BatchPayload',
      args: {
        where: arg({
          type: '${name}WhereInput',
          nullable: true,
        }),
        data: arg({
          type: '${name}UpdateManyMutationInput',
          nullable: false,
        }),
      },
      resolve(_, { where, data }, {prisma, select}) {
        return prisma.${model}.updateMany({
          where,
          data,
          ...select,
        })
      },
    })`
        : ''
    }
    }
    })`;
}
