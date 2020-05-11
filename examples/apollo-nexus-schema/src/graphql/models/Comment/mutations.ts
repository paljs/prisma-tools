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
      resolve(_parent, { data }, { prisma, select }) {
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
      resolve(_parent, { data, where }, { prisma, select }) {
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
      resolve: async (_parent, { where }, { prisma, select, onDelete }) => {
        await onDelete.cascade('Comment', where, false)
        return prisma.comment.delete({
          where,
          ...select,
        })
      },
    })

    t.field('deleteManyComment', {
      type: 'BatchPayload',
      args: {
        where: arg({
          type: 'CommentWhereInput',
          nullable: true,
        }),
      },
      resolve: async (_parent, { where }, { prisma, onDelete }) => {
        await onDelete.cascade('Comment', where, false)
        return prisma.comment.deleteMany({ where })
      },
    })

    t.field('updateManyComment', {
      type: 'BatchPayload',
      args: {
        where: arg({
          type: 'CommentWhereInput',
          nullable: true,
        }),
        data: arg({
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
