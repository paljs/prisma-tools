import { Context } from '../../../context'

export default {
  Query: {
    findOneComment: (_parent, { where }, { prisma, select }: Context) => {
      return prisma.comment.findOne({
        where,
        ...select,
      })
    },
    findManyComment: (_parent, args, { prisma, select }: Context) => {
      return prisma.comment.findMany({
        ...args,
        ...select,
      })
    },
    findManyCommentCount: (_parent, args, { prisma }: Context) => {
      return prisma.comment.count(args)
    },
  },
  Mutation: {
    createOneComment: (_parent, args, { prisma, select }: Context) => {
      return prisma.comment.create({
        ...args,
        ...select,
      })
    },
    updateOneComment: (_parent, args, { prisma, select }: Context) => {
      return prisma.comment.update({
        ...args,
        ...select,
      })
    },
    deleteOneComment: async (
      _parent,
      { where },
      { prisma, select, onDelete }: Context,
    ) => {
      await onDelete.cascade('Comment', where, false)
      return prisma.comment.delete({
        where,
        ...select,
      })
    },
    deleteManyComment: async (
      _parent,
      { where },
      { prisma, onDelete }: Context,
    ) => {
      await onDelete.cascade('Comment', where, false)
      return prisma.comment.deleteMany({ where })
    },
    updateManyComment: (_parent, args, { prisma }: Context) => {
      return prisma.comment.updateMany(args)
    },
  },
}
