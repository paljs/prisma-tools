import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findManyPostCount', {
      type: 'Int',
      args: {
        where: 'PostWhereInput',
        orderBy: 'PostOrderByInput',
        cursor: 'PostWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      resolve(_parent, args, { prisma }) {
        return prisma.post.count(args)
      },
    })
  },
})
