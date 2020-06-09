import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findManyComment', {
      type: 'Comment',
      nullable: true,
      list: true,
      args: {
        where: 'CommentWhereInput',
        orderBy: 'CommentOrderByInput',
        cursor: 'CommentWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      resolve(_parent, args, { prisma, select }) {
        return prisma.comment.findMany({
          ...args,
          ...select,
        })
      },
    })
  },
})
