import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateManyUser', {
      type: 'BatchPayload',
      args: {
        where: schema.arg({
          type: 'UserWhereInput',
          nullable: true,
        }),
        data: schema.arg({
          type: 'UserUpdateManyMutationInput',
          nullable: false,
        }),
      },
      resolve(_parent, args, { prisma }) {
        return prisma.user.updateMany(args)
      },
    })
  },
})
