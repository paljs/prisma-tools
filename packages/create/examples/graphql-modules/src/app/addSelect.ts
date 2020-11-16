import { PrismaSelect } from "@paljs/plugins";

export const addSelect = (context, next) => {
  const result = new PrismaSelect(context.info).value;
  if (!result.select || Object.keys(result.select).length > 0) {
    context.args = {
      ...context.args,
      ...result,
    };
  }
  return next();
};
