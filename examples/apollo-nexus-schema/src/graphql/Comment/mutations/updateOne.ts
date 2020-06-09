import { mutationField, arg } from '@nexus/schema'

export const CommentUpdateOneMutation = mutationField('updateOneComment', {
  type: 'Comment',
  nullable: false,
  args: {
    where: arg({
      type: 'CommentWhereUniqueInput',
      nullable: false,
    }),
    data: arg({
      type: 'CommentUpdateInput',
      nullable: false,
    }),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.comment.update({
      where,
      data,
      ...select,
    })
  },
})
