import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateOneComment', {
      type: 'Comment',
      nullable: false,
      args: {
        where: schema.arg({
          type: 'CommentWhereUniqueInput',
          nullable: false,
        }),
        data: schema.arg({
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
  },
})
