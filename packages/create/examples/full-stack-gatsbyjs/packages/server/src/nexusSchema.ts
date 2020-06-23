import { makeSchema } from '@nexus/schema'
import * as types from './graphql'
import { paljs } from '@paljs/nexus'

export const schema = makeSchema({
  types,
  plugins: [paljs({ includeAdmin: true })],
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
