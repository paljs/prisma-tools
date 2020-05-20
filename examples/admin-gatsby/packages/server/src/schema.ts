import { makeSchema } from '@nexus/schema'
import * as types from './graphql'
import { prismaSelectObject } from 'nexus-schema-plugin-prisma-select'

export const schema = makeSchema({
  types,
  plugins: [prismaSelectObject()],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
})
