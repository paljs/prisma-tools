import { ModuleContext } from "@graphql-modules/core";
import { PrismaProvider } from "../common/Prisma.provider";

export default {
  Query: {
    findOneComment: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).comment.findOne(args);
    },
    findManyComment: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).comment.findMany(args);
    },
    findManyCommentCount: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).comment.count(args);
    },
  },
  Mutation: {
    createOneComment: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).comment.create(args);
    },
    updateOneComment: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).comment.update(args);
    },
    deleteOneComment: async (_parent, args, { injector }: ModuleContext) => {
      await injector.get(PrismaProvider).onDelete("Comment", args.where, false);
      return injector.get(PrismaProvider).comment.delete(args);
    },
    upsertOneComment: async (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).comment.upsert(args);
    },
    deleteManyComment: async (_parent, args, { injector }: ModuleContext) => {
      await injector.get(PrismaProvider).onDelete("Comment", args.where, false);
      return injector.get(PrismaProvider).comment.deleteMany(args);
    },
    updateManyComment: (_parent, args, { injector }: ModuleContext) => {
      return injector.get(PrismaProvider).comment.updateMany(args);
    },
  },
};
