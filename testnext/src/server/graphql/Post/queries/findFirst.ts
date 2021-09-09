import { queryField, list } from 'nexus'

export const PostFindFirstQuery = queryField('findFirstPost', {
  type: 'Post',
  args: {
    where: 'PostWhereInput',
    orderBy: list('PostOrderByWithRelationInput'),
    cursor: 'PostWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PostScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.post.findFirst({
      ...args,
      ...select,
    })
  },
})
