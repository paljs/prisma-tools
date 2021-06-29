import { mutationField, nonNull } from 'nexus'

export const CommentDeleteOneMutation = mutationField('deleteOneComment', {
  type: 'Comment',
  args: {
    where: nonNull('CommentWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.comment.delete({
      where,
      ...select,
    })
  },
})
