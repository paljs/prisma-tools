import { extendType, stringArg } from '@nexus/schema'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { NexusGenRootTypes } from '../../generated/nexus'
import { existsSync } from 'fs'
import './schema.json'

interface Db {
  models: NexusGenRootTypes['Model'][]
  enums: NexusGenRootTypes['Enum'][]
}

const path1 = 'src/types/schema/schema.json'
const path2 = 'types/schema/schema.json'
const adapter = new FileSync<Db>(existsSync(path1) ? path1 : path2)
const db = low(adapter)

export const SchemaQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('getModel', {
      type: 'Model',
      nullable: true,
      args: {
        id: stringArg({ nullable: false }),
      },
      resolve: async (_, { id }) => {
        return db.get('models').find({ id }).value()
      },
    })
    t.field('getModels', {
      type: 'Model',
      list: true,
      nullable: true,
      resolve: async () => {
        return db.get('models').value()
      },
    })
    t.field('getEnum', {
      type: 'Enum',
      nullable: true,
      args: {
        name: stringArg({ nullable: false }),
      },
      resolve: async (_, { name }) => {
        return db.get('enums').find({ name }).value()
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
