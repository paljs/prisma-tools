import { mutationField, arg } from '@nexus/schema'

export const PostDeleteOneMutation = mutationField('deleteOnePost', {
  type: 'Post',
  nullable: true,
  args: {
    where: arg({
      type: 'PostWhereUniqueInput',
      nullable: false,
    }),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    await prisma.onDelete({ model: 'Post', where })
    return prisma.post.delete({
      where,
      ...select,
    })
  },
})
