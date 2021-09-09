import { queryField, nonNull, list } from 'nexus'

export const PostFindCountQuery = queryField('findManyPostCount', {
  type: nonNull('Int'),
  args: {
    where: 'PostWhereInput',
    orderBy: list('PostOrderByWithRelationInput'),
    cursor: 'PostWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PostScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.post.count(args as any)
  },
})
