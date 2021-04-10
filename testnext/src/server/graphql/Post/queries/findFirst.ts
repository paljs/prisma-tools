import { queryField, list } from 'nexus'

export const PostFindFirstQuery = queryField('findFirstPost', {
  type: 'Post',
  args: {
    where: 'PostWhereInput',
    orderBy: list('PostOrderByInput'),
    cursor: 'PostWhereUniqueInput',
    distinct: 'PostScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.post.findFirst({
      ...args,
      ...select,
    })
  },
})
