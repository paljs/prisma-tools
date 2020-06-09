import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findManyGroupCount', {
      type: 'Int',
      args: {
        where: 'GroupWhereInput',
        orderBy: 'GroupOrderByInput',
        cursor: 'GroupWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      resolve(_parent, args, { prisma }) {
        return prisma.group.count(args)
      },
    })
  },
})
