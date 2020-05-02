import { generateAdmin, Schema } from '@prisma-tools/admin';
import defaultSchema from '../../server/src/graphql/schema/schema.json';

generateAdmin('./packages/server/prisma/schema.prisma', defaultSchema as Schema, {
  excludeFieldsByModel: {
    User: ['password'],
  },
  excludeQueriesAndMutations: ['updateMany', 'deleteMany'],
});
