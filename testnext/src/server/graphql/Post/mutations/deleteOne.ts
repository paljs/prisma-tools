import { mutationField, nonNull } from 'nexus'

export const PostDeleteOneMutation = mutationField('deleteOnePost', {
  type: 'Post',
  args: {
    where: nonNull('PostWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    await prisma.onDelete({ model: 'Post', where })
    return prisma.post.delete({
      where,
      ...select,
    })
  },
})
