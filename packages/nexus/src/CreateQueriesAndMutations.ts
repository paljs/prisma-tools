import { QueriesAndMutationsOptions } from './types';

export function createQueriesAndMutations(
  name: string,
  options: QueriesAndMutationsOptions,
) {
  const exclude = options.excludeQueriesAndMutations.concat(
    options.excludeQueriesAndMutationsByModel[name] ?? [],
  );
  const model = name.charAt(0).toLowerCase() + name.slice(1);
  return {
    queries: `${
      options.nexusSchema
        ? `import { extendType, arg } from '@nexus/schema'`
        : `import { schema } from 'nexus'`
    }
    
    ${
      options.nexusSchema ? `export const ${name}Queries = ` : 'schema.'
    }extendType({
      type: 'Query',
      definition(t) {
        ${
          !exclude.includes('findOne')
            ? `
        t.field('findOne${name}', {
          type: '${name}',
          nullable: true,
          args: {
            where: ${!options.nexusSchema ? 'schema.' : ''}arg({
              type: '${name}WhereUniqueInput',
              nullable: false,
            }),
          },
          resolve(_parent, { where }, {prisma, select}) {
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
          resolve(_parent, args, {prisma, select}) {
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
          resolve(_parent, args, {prisma}) {
            return prisma.${model}.count(args)
          },
        })`
            : ''
        }
        }
        })`,
    mutations: `${
      options.nexusSchema
        ? `import { extendType, arg } from '@nexus/schema'`
        : `import { schema } from 'nexus'`
    }
    
    ${
      options.nexusSchema ? `export const ${name}Mutations = ` : 'schema.'
    }extendType({
      type: 'Mutation',
      definition(t) {
        ${
          !exclude.includes('createOne')
            ? `
        t.field('createOne${name}', {
          type: '${name}',
          nullable: false,
          args: {
            data: ${!options.nexusSchema ? 'schema.' : ''}arg({
              type: '${name}CreateInput',
              nullable: false,
            }),
          },
          resolve(_parent, { data }, {prisma, select}) {
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
            where: ${!options.nexusSchema ? 'schema.' : ''}arg({
              type: '${name}WhereUniqueInput',
              nullable: false,
            }),
            data: ${!options.nexusSchema ? 'schema.' : ''}arg({
              type: '${name}UpdateInput',
              nullable: false,
            }),
          },
          resolve(_parent, { data, where }, {prisma, select}) {
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
          !exclude.includes('upsertOne')
            ? `
        t.field('upsertOne${name}', {
          type: '${name}',
          nullable: false,
          args: {
            where: ${!options.nexusSchema ? 'schema.' : ''}arg({
              type: '${name}WhereUniqueInput',
              nullable: false,
            }),
            create: ${!options.nexusSchema ? 'schema.' : ''}arg({
              type: '${name}CreateInput',
              nullable: false,
            }),
            update: ${!options.nexusSchema ? 'schema.' : ''}arg({
              type: '${name}UpdateInput',
              nullable: false,
            }),
          },
          resolve(_parent, args, {prisma, select}) {
            return prisma.${model}.upsert({
              ...args,
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
            where: ${!options.nexusSchema ? 'schema.' : ''}arg({
              type: '${name}WhereUniqueInput',
              nullable: false,
            }),
          },
          resolve: async (_parent, { where }, {prisma, select}) => {
            ${
              options.onDelete
                ? `await prisma.onDelete({ model: '${name}', where })`
                : ''
            }
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
            where: ${!options.nexusSchema ? 'schema.' : ''}arg({
              type: '${name}WhereInput',
              nullable: true,
            }),
          },
          resolve: async (_parent, {where}, {prisma}) => {
            ${
              options.onDelete
                ? `await prisma.onDelete({ model: '${name}', where })`
                : ''
            }
            return prisma.${model}.deleteMany({where})
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
            where: ${!options.nexusSchema ? 'schema.' : ''}arg({
              type: '${name}WhereInput',
              nullable: true,
            }),
            data: ${!options.nexusSchema ? 'schema.' : ''}arg({
              type: '${name}UpdateManyMutationInput',
              nullable: false,
            }),
          },
          resolve(_parent, args, {prisma}) {
            return prisma.${model}.updateMany(args)
          },
        })`
            : ''
        }
        }
        })`,
  };
}
