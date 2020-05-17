import { ModuleContext } from '@graphql-modules/core';
import { PrismaProvider } from '../common/Prisma.provider';

export default {
  Query: {
    findOneGroup: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).group.findOne(args);
    },
    findManyGroup: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).group.findMany(args);
    },
    findManyGroupCount: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).group.count(args);
    },
  },
  Mutation: {
    createOneGroup: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).group.create(args);
    },
    updateOneGroup: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).group.update(args);
    },
    deleteOneGroup: async (_parent, args, { injector }: ModuleContext) => {
      await injector
        .get(PrismaProvider)
        .onDelete({ model: 'Group', where: args.where });
      return injector.get(PrismaProvider).group.delete(args);
    },
    upsertOneGroup: async (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).group.upsert(args);
    },
    deleteManyGroup: async (_parent, args, { injector }: ModuleContext) => {
      await injector
        .get(PrismaProvider)
        .onDelete({ model: 'Group', where: args.where });
      return injector.get(PrismaProvider).group.deleteMany(args);
    },
    updateManyGroup: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).group.updateMany(args);
    },
  },
};
