import { makeSchema } from '@nexus/schema'
import * as types from './types'
import { prismaSelectObject } from 'nexus-schema-prisma'

export const schema = makeSchema({
  types,
  plugins: [prismaSelectObject],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
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
