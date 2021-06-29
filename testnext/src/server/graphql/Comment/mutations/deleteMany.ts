import { mutationField, nonNull } from 'nexus'

export const CommentDeleteManyMutation = mutationField('deleteManyComment', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'CommentWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.comment.deleteMany({ where } as any)
  },
})
