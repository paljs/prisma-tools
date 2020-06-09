import { queryField } from '@nexus/schema'

export const PostFindManyCountQuery = queryField('findManyPostCount', {
  type: 'Int',
  args: {
    where: 'PostWhereInput',
    orderBy: 'PostOrderByInput',
    cursor: 'PostWhereUniqueInput',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.post.count(args)
  },
})
