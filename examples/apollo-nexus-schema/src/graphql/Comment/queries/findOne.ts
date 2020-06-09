import { queryField, arg } from '@nexus/schema'

export const CommentFindOneQuery = queryField('findOneComment', {
  type: 'Comment',
  nullable: true,
  args: {
    where: arg({
      type: 'CommentWhereUniqueInput',
      nullable: false,
    }),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.comment.findOne({
      where,
      ...select,
    })
  },
})
