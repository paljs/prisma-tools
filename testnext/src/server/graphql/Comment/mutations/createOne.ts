import { mutationField, nonNull } from 'nexus'

export const CommentCreateOneMutation = mutationField('createOneComment', {
  type: nonNull('Comment'),
  args: {
    data: nonNull('CommentCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.comment.create({
      data,
      ...select,
    })
  },
})
