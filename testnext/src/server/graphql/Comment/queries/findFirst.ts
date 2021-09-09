import { queryField, list } from 'nexus'

export const CommentFindFirstQuery = queryField('findFirstComment', {
  type: 'Comment',
  args: {
    where: 'CommentWhereInput',
    orderBy: list('CommentOrderByWithRelationInput'),
    cursor: 'CommentWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CommentScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.comment.findFirst({
      ...args,
      ...select,
    })
  },
})
