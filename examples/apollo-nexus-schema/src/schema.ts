import { makeSchema } from '@nexus/schema'
import * as types from './graphql'
import { prismaSelectObject } from 'nexus-plugin-prisma-select/dist/lib/schema'

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
