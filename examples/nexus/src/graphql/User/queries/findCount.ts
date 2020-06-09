import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findManyUserCount', {
      type: 'Int',
      args: {
        where: 'UserWhereInput',
        orderBy: 'UserOrderByInput',
        cursor: 'UserWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      resolve(_parent, args, { prisma }) {
        return prisma.user.count(args)
      },
    })
  },
})
