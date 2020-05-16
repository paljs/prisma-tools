import { Context } from '../../../context';

export default {
  Query: {
    findOneGroup: (_parent, args, { prisma }: Context) => {
      return prisma.group.findOne(args);
    },
    findManyGroup: (_parent, args, { prisma }: Context) => {
      return prisma.group.findMany(args);
    },
    findManyGroupCount: (_parent, args, { prisma }: Context) => {
      return prisma.group.count(args);
    },
  },
};
