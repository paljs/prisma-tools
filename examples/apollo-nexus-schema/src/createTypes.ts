import { createTypes } from '@prisma-tools/nexus'

// for include every thing just createTypes() without any args

createTypes({
  nexusSchema: true,
  fieldsExclude: ['createdAt', 'updatedAt'],
  excludeFieldsByModel: {
    User: ['password'],
  },
  modelsExclude: [{ name: 'Group', mutations: true }],
  excludeQueriesAndMutationsByModel: {
    Post: ['deleteMany'],
  },
})
