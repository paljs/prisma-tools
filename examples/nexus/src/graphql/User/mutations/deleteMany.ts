import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deleteManyUser', {
      type: 'BatchPayload',
      args: {
        where: schema.arg({
          type: 'UserWhereInput',
          nullable: true,
        }),
      },
      resolve: async (_parent, { where }, { prisma }) => {
        await prisma.onDelete({ model: 'User', where })
        return prisma.user.deleteMany({ where })
      },
    })
  },
})
