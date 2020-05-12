import { Context } from "../../../context";
import { PrismaSelect } from "../../../index";

export default {
  Query: {
    findOneUser: (_parent, { where }, { prisma, select }: Context) => {
      return prisma.user.findOne({
        where,
        ...select,
      });
    },
    findManyUser: (_parent, args, { prisma }: Context, info) => {
      const select = new PrismaSelect(info);
      return prisma.user.findMany({
        ...args,
        ...select.value,
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
