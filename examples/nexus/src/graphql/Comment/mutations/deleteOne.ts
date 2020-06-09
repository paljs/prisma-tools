import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteOneComment', {
      type: 'Comment',
      nullable: true,
      args: {
        where: schema.arg({
          type: 'CommentWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve: async (_parent, { where }, { prisma, select }) => {
        await prisma.onDelete({ model: 'Comment', where })
        return prisma.comment.delete({
          where,
          ...select,
        })
      },
    })
  },
})
