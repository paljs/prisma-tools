import { makeSchema } from '@nexus/schema'
import * as types from './graphql'
import { paljs } from '@paljs/nexus'

export const schema = makeSchema({
  types,
  plugins: [paljs()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    sources: [
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
})
