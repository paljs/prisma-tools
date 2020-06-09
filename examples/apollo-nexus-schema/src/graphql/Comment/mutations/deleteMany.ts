import { mutationField, arg } from '@nexus/schema'

export const CommentDeleteManyMutation = mutationField('deleteManyComment', {
  type: 'BatchPayload',
  args: {
    where: arg({
      type: 'CommentWhereInput',
      nullable: true,
    }),
  },
  resolve: async (_parent, { where }, { prisma }) => {
    await prisma.onDelete({ model: 'Comment', where })
    return prisma.comment.deleteMany({ where })
  },
})
