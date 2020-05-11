import { Context } from "../../../context";

export default {
  Query: {
    findOnePost: (_parent, { where }, { prisma, select }: Context) => {
      return prisma.post.findOne({
        where,
        ...select,
      });
    },
    findManyPost: (_parent, args, { prisma, select }: Context) => {
      return prisma.post.findMany({
        ...args,
        ...select,
      });
    },
    findManyPostCount: (_parent, args, { prisma }: Context) => {
      return prisma.post.count(args);
    },
  },
  Mutation: {
    createOnePost: (_parent, args, { prisma, select }: Context) => {
      return prisma.post.create({
        ...args,
        ...select,
      });
    },
    updateOnePost: (_parent, args, { prisma, select }: Context) => {
      return prisma.post.update({
        ...args,
        ...select,
      });
    },
    deleteOnePost: async (
      _parent,
      { where },
      { prisma, select, onDelete }: Context
    ) => {
      await onDelete.cascade("Post", where, false);
      return prisma.post.delete({
        where,
        ...select,
      });
    },
    updateManyPost: (_parent, args, { prisma }: Context) => {
      return prisma.post.updateMany(args);
    },
  },
};
