import { queryField, nonNull } from 'nexus'

export const PostFindUniqueQuery = queryField('findUniquePost', {
  type: 'Post',
  args: {
    where: nonNull('PostWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.post.findUnique({
      where,
      ...select,
    })
  },
})
