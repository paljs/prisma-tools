import { Context } from "../../../context";

export default {
  Query: {
    findOneGroup: (_parent, { where }, { prisma, select }: Context) => {
      return prisma.group.findOne({
        where,
        ...select,
      });
    },
    findManyGroup: (_parent, args, { prisma, select }: Context) => {
      return prisma.group.findMany({
        ...args,
        ...select,
      });
    },
    findManyGroupCount: (_parent, args, { prisma }: Context) => {
      return prisma.group.count(args);
    },
  },
};
