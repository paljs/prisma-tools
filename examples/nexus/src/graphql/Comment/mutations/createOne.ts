import { schema } from 'nexus'

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOneComment', {
      type: 'Comment',
      nullable: false,
      args: {
        data: schema.arg({
          type: 'CommentCreateInput',
          nullable: false,
        }),
      },
      resolve(_parent, { data }, { prisma, select }) {
        return prisma.comment.create({
          data,
          ...select,
        })
      },
    })
  },
})
