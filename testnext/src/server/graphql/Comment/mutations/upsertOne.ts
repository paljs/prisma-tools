import { mutationField, nonNull } from 'nexus'

export const CommentUpsertOneMutation = mutationField('upsertOneComment', {
  type: nonNull('Comment'),
  args: {
    where: nonNull('CommentWhereUniqueInput'),
    create: nonNull('CommentCreateInput'),
    update: nonNull('CommentUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.comment.upsert({
      ...args,
      ...select,
    })
  },
})
