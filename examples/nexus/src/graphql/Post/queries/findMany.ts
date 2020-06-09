import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findManyPost', {
      type: 'Post',
      nullable: true,
      list: true,
      args: {
        where: 'PostWhereInput',
        orderBy: 'PostOrderByInput',
        cursor: 'PostWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      resolve(_parent, args, { prisma, select }) {
        return prisma.post.findMany({
          ...args,
          ...select,
        })
      },
    })
  },
})
