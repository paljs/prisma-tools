import { extendType, arg } from '@nexus/schema'

export const UserQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('findOneUser', {
      type: 'User',
      nullable: true,
      args: {
        where: arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_parent, { where }, { prisma, select }) {
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
      resolve(_parent, args, { prisma, select }) {
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
      resolve(_parent, args, { prisma }) {
        return prisma.user.count(args)
      },
    })
  },
})
