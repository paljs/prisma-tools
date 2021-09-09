import { mutationField, nonNull } from 'nexus'

export const CommentUpdateOneMutation = mutationField('updateOneComment', {
  type: nonNull('Comment'),
  args: {
    data: nonNull('CommentUpdateInput'),
    where: nonNull('CommentWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.comment.update({
      where,
      data,
      ...select,
    })
  },
})
