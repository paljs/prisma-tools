import { Context } from '../../../context';

export default {
  Query: {
    findOnePost: (_parent, args, { prisma }: Context) => {
      return prisma.post.findOne(args);
    },
    findManyPost: (_parent, args, { prisma }: Context) => {
      return prisma.post.findMany(args);
    },
    findManyPostCount: (_parent, args, { prisma }: Context) => {
      return prisma.post.count(args);
    },
  },
  Mutation: {
    createOnePost: (_parent, args, { prisma }: Context) => {
      return prisma.post.create(args);
    },
    updateOnePost: (_parent, args, { prisma }: Context) => {
      return prisma.post.update(args);
    },
    deleteOnePost: async (_parent, args, { prisma, onDelete }: Context) => {
      await onDelete.cascade('Post', args.where, false);
      return prisma.post.delete(args);
    },
    upsertOnePost: async (_parent, args, { prisma }: Context) => {
      return prisma.post.upsert(args);
    },
    updateManyPost: (_parent, args, { prisma }: Context) => {
      return prisma.post.updateMany(args);
    },
  },
};
