import { mutationField, nonNull } from 'nexus'

export const CommentUpdateManyMutation = mutationField('updateManyComment', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('CommentUpdateManyMutationInput'),
    where: 'CommentWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.comment.updateMany(args as any)
  },
})
