import { extendType, arg } from '@nexus/schema'

export const GroupQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('findOneGroup', {
      type: 'Group',
      nullable: true,
      args: {
        where: arg({
          type: 'GroupWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_, { where }, { prisma, select }) {
        return prisma.group.findOne({
          where,
          ...select,
        })
      },
    })

    t.field('findManyGroup', {
      type: 'Group',
      nullable: true,
      list: true,
      args: {
        where: 'GroupWhereInput',
        orderBy: 'GroupOrderByInput',
        after: 'GroupWhereUniqueInput',
        before: 'GroupWhereUniqueInput',
        skip: 'Int',
        first: 'Int',
        last: 'Int',
      },
      resolve: async (_root, args, { prisma, select }) => {
        return prisma.group.findMany({
          ...args,
          ...select,
        })
      },
    })

    t.field('findManyGroupCount', {
      type: 'Int',
      args: {
        where: 'GroupWhereInput',
        orderBy: 'GroupOrderByInput',
        after: 'GroupWhereUniqueInput',
        before: 'GroupWhereUniqueInput',
        skip: 'Int',
        first: 'Int',
        last: 'Int',
      },
      resolve: async (_root, args, { prisma }) => {
        return prisma.group.count({ ...args })
      },
    })
  },
})
