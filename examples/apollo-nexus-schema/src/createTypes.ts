import { createTypes } from 'nexus-schema-prisma'

// for include every thing just createTypes() without any args

createTypes({
  fieldsExclude: ['createdAt', 'updatedAt'],
  excludeFieldsByModel: {
    User: ['password'],
  },
  modelsExclude: [{ name: 'Group', mutations: true }],
  excludeQueriesAndMutationsByModel: {
    Post: ['deleteMany'],
  },
})
