import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findOneUser', {
      type: 'User',
      nullable: true,
      args: {
        where: schema.arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_, { where }, { prisma, select }) {
        return prisma.user.findOne({
          where,
          ...select,
        })
      },
    })

    t.field('findManyUser', {
      type: 'User',
      nullable: true,
      list: true,
      args: {
        where: 'UserWhereInput',
        orderBy: 'UserOrderByInput',
        after: 'UserWhereUniqueInput',
        before: 'UserWhereUniqueInput',
        skip: 'Int',
        first: 'Int',
        last: 'Int',
      },
      resolve: async (_root, args, { prisma, select }) => {
        return prisma.user.findMany({
          ...args,
          ...select,
        })
      },
    })

    t.field('findManyUserCount', {
      type: 'Int',
      args: {
        where: 'UserWhereInput',
        orderBy: 'UserOrderByInput',
        after: 'UserWhereUniqueInput',
        before: 'UserWhereUniqueInput',
        skip: 'Int',
        first: 'Int',
        last: 'Int',
      },
      resolve: async (_root, args, { prisma }) => {
        return prisma.user.count({ ...args })
      },
    })
  },
})
