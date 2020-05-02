import { createTypes } from '@prisma-tools/nexus'

createTypes({
  onDelete: true,
  nexusSchema: true,
  excludeFieldsByModel: {
    User: ['password'],
  },
  excludeQueriesAndMutations: ['deleteMany', 'updateMany'],
})
