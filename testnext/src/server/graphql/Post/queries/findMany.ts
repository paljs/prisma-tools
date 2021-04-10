import { queryField, nonNull, list } from 'nexus'

export const PostFindManyQuery = queryField('findManyPost', {
  type: nonNull(list(nonNull('Post'))),
  args: {
    where: 'PostWhereInput',
    orderBy: list('PostOrderByInput'),
    cursor: 'PostWhereUniqueInput',
    distinct: 'PostScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.post.findMany({
      ...args,
      ...select,
    })
  },
})
