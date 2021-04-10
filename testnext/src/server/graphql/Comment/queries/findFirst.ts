import { queryField, list } from 'nexus'

export const CommentFindFirstQuery = queryField('findFirstComment', {
  type: 'Comment',
  args: {
    where: 'CommentWhereInput',
    orderBy: list('CommentOrderByInput'),
    cursor: 'CommentWhereUniqueInput',
    distinct: 'CommentScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.comment.findFirst({
      ...args,
      ...select,
    })
  },
})
