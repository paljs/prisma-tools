import { Context } from '../../../context';

export default {
  Query: {
    findOneUser: (_parent, args, { prisma }: Context) => {
      return prisma.user.findOne(args);
    },
    findManyUser: (_parent, args, { prisma }: Context) => {
      return prisma.user.findMany(args);
    },
    findManyUserCount: (_parent, args, { prisma }: Context) => {
      return prisma.user.count(args);
    },
  },
  Mutation: {
    createOneUser: (_parent, args, { prisma }: Context) => {
      return prisma.user.create(args);
    },
    updateOneUser: (_parent, args, { prisma }: Context) => {
      return prisma.user.update(args);
    },
    deleteOneUser: async (_parent, args, { prisma, onDelete }: Context) => {
      await onDelete.cascade('User', args.where, false);
      return prisma.user.delete(args);
    },
    upsertOneUser: async (_parent, args, { prisma }: Context) => {
      return prisma.user.upsert(args);
    },
    deleteManyUser: async (_parent, args, { prisma, onDelete }: Context) => {
      await onDelete.cascade('User', args.where, false);
      return prisma.user.deleteMany(args);
    },
    updateManyUser: (_parent, args, { prisma }: Context) => {
      return prisma.user.updateMany(args);
    },
  },
};
