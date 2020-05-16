import { ModuleContext } from '@graphql-modules/core';
import { PrismaProvider } from '../common/Prisma.provider';

export default {
  Query: {
    findOneUser: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).user.findOne(args);
    },
    findManyUser: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).user.findMany(args);
    },
    findManyUserCount: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).user.count(args);
    },
  },
  Mutation: {
    createOneUser: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).user.create(args);
    },
    updateOneUser: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).user.update(args);
    },
    deleteOneUser: async (_parent, args, { injector }: ModuleContext) => {
      await injector.get(PrismaProvider).onDelete('User', args.where);
      return injector.get(PrismaProvider).user.delete(args);
    },
    upsertOneUser: async (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).user.upsert(args);
    },
    deleteManyUser: async (_parent, args, { injector }: ModuleContext) => {
      await injector.get(PrismaProvider).onDelete('User', args.where);
      return injector.get(PrismaProvider).user.deleteMany(args);
    },
    updateManyUser: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).user.updateMany(args);
    },
  },
};
