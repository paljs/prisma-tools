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

    t.field('upsertOneComment', {
      type: 'Comment',
      nullable: false,
      args: {
        where: arg({
          type: 'CommentWhereUniqueInput',
          nullable: false,
        }),
        create: arg({
          type: 'CommentCreateInput',
          nullable: false,
        }),
        update: arg({
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

    t.field('deleteOneComment', {
      type: 'Comment',
      nullable: true,
      args: {
        where: arg({
          type: 'CommentWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve: async (_parent, { where }, { prisma, select }) => {
        await prisma.onDelete({ model: 'Comment', where })
        return prisma.comment.delete({
          where,
          ...select,
        })
      },
    })
  },
})
