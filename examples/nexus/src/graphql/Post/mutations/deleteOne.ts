import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteOnePost', {
      type: 'Post',
      nullable: true,
      args: {
        where: schema.arg({
          type: 'PostWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve: async (_parent, { where }, { prisma, select }) => {
        await prisma.onDelete({ model: 'Post', where })
        return prisma.post.delete({
          where,
          ...select,
        })
      },
    })
  },
})
