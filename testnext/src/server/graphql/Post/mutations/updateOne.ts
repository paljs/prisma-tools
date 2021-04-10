import { mutationField, nonNull } from 'nexus'

export const PostUpdateOneMutation = mutationField('updateOnePost', {
  type: nonNull('Post'),
  args: {
    where: nonNull('PostWhereUniqueInput'),
    data: nonNull('PostUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.post.update({
      where,
      data,
      ...select,
    })
  },
})
