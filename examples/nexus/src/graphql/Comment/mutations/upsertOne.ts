import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('upsertOneComment', {
      type: 'Comment',
      nullable: false,
      args: {
        where: schema.arg({
          type: 'CommentWhereUniqueInput',
          nullable: false,
        }),
        create: schema.arg({
          type: 'CommentCreateInput',
          nullable: false,
        }),
        update: schema.arg({
          type: 'CommentUpdateInput',
          nullable: false,
        }),
      },
      resolve(_parent, args, { prisma, select }) {
        return prisma.comment.upsert({
          ...args,
          ...select,
        })
      },
    })
  },
})
