import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateManyComment', {
      type: 'BatchPayload',
      args: {
        where: schema.arg({
          type: 'CommentWhereInput',
          nullable: true,
        }),
        data: schema.arg({
          type: 'CommentUpdateManyMutationInput',
          nullable: false,
        }),
      },
      resolve(_parent, args, { prisma }) {
        return prisma.comment.updateMany(args)
      },
    })
  },
})
