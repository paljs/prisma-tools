import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findOneComment', {
      type: 'Comment',
      nullable: true,
      args: {
        where: schema.arg({
          type: 'CommentWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_, { where }, { prisma, select }) {
        return prisma.comment.findOne({
          where,
          ...select,
        })
      },
    })

    t.field('findManyComment', {
      type: 'Comment',
      nullable: true,
      list: true,
      args: {
        where: 'CommentWhereInput',
        orderBy: 'CommentOrderByInput',
        after: 'CommentWhereUniqueInput',
        before: 'CommentWhereUniqueInput',
        skip: 'Int',
        first: 'Int',
        last: 'Int',
      },
      resolve: async (_root, args, { prisma, select }) => {
        return prisma.comment.findMany({
          ...args,
          ...select,
        })
      },
    })

    t.field('findManyCommentCount', {
      type: 'Int',
      args: {
        where: 'CommentWhereInput',
        orderBy: 'CommentOrderByInput',
        after: 'CommentWhereUniqueInput',
        before: 'CommentWhereUniqueInput',
        skip: 'Int',
        first: 'Int',
        last: 'Int',
      },
      resolve: async (_root, args, { prisma }) => {
        return prisma.comment.count({ ...args })
      },
    })
  },
})
