import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findManyGroup', {
      type: 'Group',
      nullable: true,
      list: true,
      args: {
        where: 'GroupWhereInput',
        orderBy: 'GroupOrderByInput',
        cursor: 'GroupWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      resolve(_parent, args, { prisma, select }) {
        return prisma.group.findMany({
          ...args,
          ...select,
        })
      },
    })
  },
})
