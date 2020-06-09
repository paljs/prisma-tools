import { mutationField, arg } from '@nexus/schema'

export const CommentCreateOneMutation = mutationField('createOneComment', {
  type: 'Comment',
  nullable: false,
  args: {
    data: arg({
      type: 'CommentCreateInput',
      nullable: false,
    }),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.comment.create({
      data,
      ...select,
    })
  },
})
