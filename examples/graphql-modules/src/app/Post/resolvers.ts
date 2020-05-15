import { ModuleContext } from "@graphql-modules/core";
import { PrismaProvider } from "../common/Prisma.provider";

export default {
  Query: {
    findOnePost: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).post.findOne(args);
    },
    findManyPost: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).post.findMany(args);
    },
    findManyPostCount: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).post.count(args);
    },
  },
  Mutation: {
    createOnePost: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).post.create(args);
    },
    updateOnePost: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).post.update(args);
    },
    deleteOnePost: async (_parent, args, { injector }: ModuleContext) => {
      await injector.get(PrismaProvider).onDelete("Post", args.where, false);
      return injector.get(PrismaProvider).post.delete(args);
    },
    upsertOnePost: async (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).post.upsert(args);
    },
    deleteManyPost: async (_parent, args, { injector }: ModuleContext) => {
      await injector.get(PrismaProvider).onDelete("Post", args.where, false);
      return injector.get(PrismaProvider).post.deleteMany(args);
    },
    updateManyPost: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).post.updateMany(args);
    },
  },
};
