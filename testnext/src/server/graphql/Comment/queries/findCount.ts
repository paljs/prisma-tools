import { queryField, nonNull, list } from 'nexus'

export const CommentFindCountQuery = queryField('findManyCommentCount', {
  type: nonNull('Int'),
  args: {
    where: 'CommentWhereInput',
    orderBy: list('CommentOrderByWithRelationInput'),
    cursor: 'CommentWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CommentScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.comment.count(args as any)
  },
})
