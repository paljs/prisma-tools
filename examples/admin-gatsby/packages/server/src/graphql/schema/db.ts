import { extendType, stringArg } from '@nexus/schema'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { NexusGenRootTypes } from '../../generated/nexus'
import './schema.json'
const fs = require('fs')

interface Db {
  models: NexusGenRootTypes['Model'][]
  enums: NexusGenRootTypes['Enum'][]
}

const path1 = 'src/graphql/schema/schema.json'
const path2 = 'graphql/schema/schema.json'
const adapter = new FileSync<Db>(fs.existsSync(path1) ? path1 : path2)
const db = low(adapter)

export const SchemaQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('getSchema', {
      type: 'Schema',
      resolve: async () => {
        return db.value()
      },
    })
  },
})

export const SchemaMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateModel', {
      type: 'Model',
      args: {
        id: stringArg({ nullable: false }),
        data: 'UpdateModelInput',
      },
      resolve: async (_, { id, data }) => {
        return db.get('models').find({ id }).assign(data).write()
      },
    })
    t.field('updateField', {
      type: 'Field',
      args: {
        id: stringArg({ nullable: false }),
        modelId: stringArg({ nullable: false }),
        data: 'UpdateFieldInput',
      },
      resolve: async (_, { id, modelId, data }) => {
        return db
          .get('models')
          .find({ id: modelId })
          .get('fields')
          .find({ id })
          .assign(data)
          .write()
      },
    })
  },
})
