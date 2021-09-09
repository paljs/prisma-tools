import { mutationField, nonNull } from 'nexus'

export const PostUpdateOneMutation = mutationField('updateOnePost', {
  type: nonNull('Post'),
  args: {
    data: nonNull('PostUpdateInput'),
    where: nonNull('PostWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.post.update({
      where,
      data,
      ...select,
    })
  },
})
