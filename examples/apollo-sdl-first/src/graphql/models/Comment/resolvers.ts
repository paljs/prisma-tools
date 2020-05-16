import { Context } from '../../../context';

export default {
  Query: {
    findOneComment: (_parent, args, { prisma }: Context) => {
      return prisma.comment.findOne(args);
    },
    findManyComment: (_parent, args, { prisma }: Context) => {
      return prisma.comment.findMany(args);
    },
    findManyCommentCount: (_parent, args, { prisma }: Context) => {
      return prisma.comment.count(args);
    },
  },
  Mutation: {
    createOneComment: (_parent, args, { prisma }: Context) => {
      return prisma.comment.create(args);
    },
    updateOneComment: (_parent, args, { prisma }: Context) => {
      return prisma.comment.update(args);
    },
    deleteOneComment: async (_parent, args, { prisma }: Context) => {
      await prisma.onDelete({ model: 'Comment', where: args.where });
      return prisma.comment.delete(args);
    },
    upsertOneComment: async (_parent, args, { prisma }: Context) => {
      return prisma.comment.upsert(args);
    },
    deleteManyComment: async (_parent, args, { prisma }: Context) => {
      await prisma.onDelete({ model: 'Comment', where: args.where });
      return prisma.comment.deleteMany(args);
    },
    updateManyComment: (_parent, args, { prisma }: Context) => {
      return prisma.comment.updateMany(args);
    },
  },
};
