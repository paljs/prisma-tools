import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateManyPost', {
      type: 'BatchPayload',
      args: {
        where: schema.arg({
          type: 'PostWhereInput',
          nullable: true,
        }),
        data: schema.arg({
          type: 'PostUpdateManyMutationInput',
          nullable: false,
        }),
      },
      resolve(_parent, args, { prisma }) {
        return prisma.post.updateMany(args)
      },
    })
  },
})
