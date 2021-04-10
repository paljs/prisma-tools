import { queryField, nonNull, list } from 'nexus'

export const PostFindCountQuery = queryField('findManyPostCount', {
  type: nonNull('Int'),
  args: {
    where: 'PostWhereInput',
    orderBy: list('PostOrderByInput'),
    cursor: 'PostWhereUniqueInput',
    distinct: 'PostScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.post.count(args as any)
  },
})
