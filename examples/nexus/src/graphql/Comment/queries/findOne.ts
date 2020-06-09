import { schema } from 'nexus'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findOneComment', {
      type: 'Comment',
      nullable: true,
      args: {
        where: schema.arg({
          type: 'CommentWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_parent, { where }, { prisma, select }) {
        return prisma.comment.findOne({
          where,
          ...select,
        })
      },
    })
  },
})
