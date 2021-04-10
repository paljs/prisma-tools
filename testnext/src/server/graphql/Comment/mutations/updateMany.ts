import { mutationField, nonNull } from 'nexus'

export const CommentUpdateManyMutation = mutationField('updateManyComment', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'CommentWhereInput',
    data: nonNull('CommentUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.comment.updateMany(args as any)
  },
})
