import { mutationField, arg } from '@nexus/schema'

export const CommentDeleteOneMutation = mutationField('deleteOneComment', {
  type: 'Comment',
  nullable: true,
  args: {
    where: arg({
      type: 'CommentWhereUniqueInput',
      nullable: false,
    }),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    await prisma.onDelete({ model: 'Comment', where })
    return prisma.comment.delete({
      where,
      ...select,
    })
  },
})
