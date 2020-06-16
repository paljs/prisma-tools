import { createModules } from '@prisma-tools/graphql-modules';

createModules({
  onDelete: true,
  excludeCommon: true,
});
