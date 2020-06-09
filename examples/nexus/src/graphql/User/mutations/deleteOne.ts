import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteOneUser', {
      type: 'User',
      nullable: true,
      args: {
        where: schema.arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve: async (_parent, { where }, { prisma, select }) => {
        await prisma.onDelete({ model: 'User', where })
        return prisma.user.delete({
          where,
          ...select,
        })
      },
    })
  },
})
