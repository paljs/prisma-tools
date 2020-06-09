import { mutationField, arg } from '@nexus/schema'

export const CommentUpsertOneMutation = mutationField('upsertOneComment', {
  type: 'Comment',
  nullable: false,
  args: {
    where: arg({
      type: 'CommentWhereUniqueInput',
      nullable: false,
    }),
    create: arg({
      type: 'CommentCreateInput',
      nullable: false,
    }),
    update: arg({
      type: 'CommentUpdateInput',
      nullable: false,
    }),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.comment.upsert({
      ...args,
      ...select,
    })
  },
})
