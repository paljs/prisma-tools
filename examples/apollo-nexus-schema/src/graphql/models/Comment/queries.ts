import { extendType, arg } from '@nexus/schema'

export const CommentQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('findOneComment', {
      type: 'Comment',
      nullable: true,
      args: {
        where: arg({
          type: 'CommentWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_parent, { where }, { prisma, select }) {
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
