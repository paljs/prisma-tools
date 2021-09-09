import { queryField, nonNull, list } from 'nexus'

export const PostFindManyQuery = queryField('findManyPost', {
  type: nonNull(list(nonNull('Post'))),
  args: {
    where: 'PostWhereInput',
    orderBy: list('PostOrderByWithRelationInput'),
    cursor: 'PostWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PostScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.post.findMany({
      ...args,
      ...select,
    })
  },
})
