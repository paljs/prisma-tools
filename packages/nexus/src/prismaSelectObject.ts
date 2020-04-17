import getPrismaSelect from 'prisma-select';
import { plugin } from '@nexus/schema';

export const prismaSelectObject = plugin({
  name: 'prismaSelectObject',
  onCreateFieldResolver() {
    return async (root, args, ctx, info, next) => {
      ctx.select = getPrismaSelect(info);
      return await next(root, args, ctx, info);
    };
  },
});
