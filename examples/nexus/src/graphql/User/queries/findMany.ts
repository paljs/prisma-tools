import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findManyUser', {
      type: 'User',
      nullable: true,
      list: true,
      args: {
        where: 'UserWhereInput',
        orderBy: 'UserOrderByInput',
        cursor: 'UserWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      resolve(_parent, args, { prisma, select }) {
        return prisma.user.findMany({
          ...args,
          ...select,
        })
      },
    })
  },
})
