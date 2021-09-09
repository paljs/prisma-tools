import { queryField, list } from 'nexus'

export const PostAggregateQuery = queryField('aggregatePost', {
  type: 'AggregatePost',
  args: {
    where: 'PostWhereInput',
    orderBy: list('PostOrderByWithRelationInput'),
    cursor: 'PostWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.post.aggregate({ ...args, ...select }) as any
  },
})
