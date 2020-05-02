import { extendType, arg } from '@nexus/schema'

export const CommentMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOneComment', {
      type: 'Comment',
      nullable: false,
      args: {
        data: arg({
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
        where: arg({
          type: 'CommentWhereUniqueInput',
          nullable: false,
        }),
        data: arg({
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
        where: arg({
          type: 'CommentWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve: async (_, { where }, { prisma, select, onDelete }) => {
        await onDelete.cascade('Comment', where, false)
        return prisma.comment.delete({
          where,
          ...select,
        })
      },
    })
  },
})
