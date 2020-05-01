import { createTypes } from '@prisma-tools/nexus'

createTypes({
  excludeFieldsByModel: {
    User: ['password'],
  },
  excludeQueriesAndMutations: ['deleteMany', 'updateMany'],
})
