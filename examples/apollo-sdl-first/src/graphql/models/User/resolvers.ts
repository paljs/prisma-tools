import { Context } from "../../../context";

export default {
  Query: {
    findOneUser: (_parent, { where }, { prisma, select }: Context) => {
      return prisma.user.findOne({
        where,
        ...select,
      });
    },
    findManyUser: (_parent, args, { prisma, select }: Context) => {
      return prisma.user.findMany({
        ...args,
        ...select,
      });
    },
    findManyUserCount: (_parent, args, { prisma }: Context) => {
      return prisma.user.count(args);
    },
  },
  Mutation: {
    createOneUser: (_parent, args, { prisma, select }: Context) => {
      return prisma.user.create({
        ...args,
        ...select,
      });
    },
    updateOneUser: (_parent, args, { prisma, select }: Context) => {
      return prisma.user.update({
        ...args,
        ...select,
      });
    },
    deleteOneUser: async (
      _parent,
      { where },
      { prisma, select, onDelete }: Context
    ) => {
      await onDelete.cascade("User", where, false);
      return prisma.user.delete({
        where,
        ...select,
      });
    },
    upsertOneUser: async (_parent, args, { prisma, select }: Context) => {
      return prisma.user.upsert({
        ...args,
        ...select,
      });
    },
    deleteManyUser: async (
      _parent,
      { where },
      { prisma, onDelete }: Context
    ) => {
      await onDelete.cascade("User", where, false);
      return prisma.user.deleteMany({ where });
    },
    updateManyUser: (_parent, args, { prisma }: Context) => {
      return prisma.user.updateMany(args);
    },
  },
};
