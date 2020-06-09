import { mutationField, arg } from '@nexus/schema'

export const CommentUpdateManyMutation = mutationField('updateManyComment', {
  type: 'BatchPayload',
  args: {
    where: arg({
      type: 'CommentWhereInput',
      nullable: true,
    }),
    data: arg({
      type: 'CommentUpdateManyMutationInput',
      nullable: false,
    }),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.comment.updateMany(args)
  },
})
