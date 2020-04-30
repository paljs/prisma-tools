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
      resolve(_, { data }, { prisma, select }) {
        return prisma.comment.create({
          data,
          ...select,
        })
      },
    })

    t.field('updateOneComment', {
      type: 'Comment',
      nullable: false,
      args: {
        where: schema.arg({
          type: 'CommentWhereUniqueInput',
          nullable: false,
        }),
        data: schema.arg({
          type: 'CommentUpdateInput',
          nullable: false,
        }),
      },
      resolve(_, { data, where }, { prisma, select }) {
        return prisma.comment.update({
          data,
          where,
          ...select,
        })
      },
    })

    t.field('deleteOneComment', {
      type: 'Comment',
      nullable: true,
      args: {
        where: schema.arg({
          type: 'CommentWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve: async (_, { where }, { prisma, select }) => {
        return prisma.comment.delete({
          where,
          ...select,
        })
      },
    })

    t.field('deleteManyComment', {
      type: 'BatchPayload',
      args: {
        where: schema.arg({
          type: 'CommentWhereInput',
          nullable: true,
        }),
      },
      resolve: async (_, { where }, { prisma, select }) => {
        return prisma.comment.deleteMany({
          where,
          ...select,
        })
      },
    })

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
      resolve(_, { where, data }, { prisma, select }) {
        return prisma.comment.updateMany({
          where,
          data,
          ...select,
        })
      },
    })
  },
})
