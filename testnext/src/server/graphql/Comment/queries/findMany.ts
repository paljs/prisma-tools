import { queryField, nonNull, list } from 'nexus'

export const CommentFindManyQuery = queryField('findManyComment', {
  type: nonNull(list(nonNull('Comment'))),
  args: {
    where: 'CommentWhereInput',
    orderBy: list('CommentOrderByInput'),
    cursor: 'CommentWhereUniqueInput',
    distinct: 'CommentScalarFieldEnum',
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
