import { PrismaSelect } from '@prisma-tools/select';
import { plugin } from '@nexus/schema';

export const prismaSelectObject = () =>
  plugin({
    name: 'prismaSelectObject',
    onCreateFieldResolver() {
      return async (root, args, ctx, info: any, next) => {
        ctx.select = new PrismaSelect(info).value;
        return await next(root, args, ctx, info);
      };
    },
  });
