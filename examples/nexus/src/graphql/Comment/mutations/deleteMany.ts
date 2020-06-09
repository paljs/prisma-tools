import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteManyComment', {
      type: 'BatchPayload',
      args: {
        where: schema.arg({
          type: 'CommentWhereInput',
          nullable: true,
        }),
      },
      resolve: async (_parent, { where }, { prisma }) => {
        await prisma.onDelete({ model: 'Comment', where })
        return prisma.comment.deleteMany({ where })
      },
    })
  },
})
