import { PrismaSelect } from '@paljs/plugins';

export const addSelect = (next) => async (root, args, context, info) => {
  const result = new PrismaSelect(info).value;
  if (Object.keys(result.select).length > 0) {
    args = {
      ...args,
      ...result,
    };
  }
  return next(root, args, context, info);
};
