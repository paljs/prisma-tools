import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findManyCommentCount', {
      type: 'Int',
      args: {
        where: 'CommentWhereInput',
        orderBy: 'CommentOrderByInput',
        cursor: 'CommentWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      resolve(_parent, args, { prisma }) {
        return prisma.comment.count(args)
      },
    })
  },
})
