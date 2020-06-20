import { Config } from './src/types';

const config: Config = {
  schemaFolder: '/Users/ahmed/Sites/prisma-tools/examples/nexus/prisma',
  backend: {
    generator: 'nexus',
    output: '/Users/ahmed/Sites/prisma-tools/examples/nexus/src/graphql',
    onDelete: true,
    excludeFields: ['createdAt', 'updatedAt'],
    excludeFieldsByModel: {
      User: ['password'],
    },
    excludeModels: [{ name: 'Group', mutations: true }],
    excludeQueriesAndMutationsByModel: {
      Post: ['deleteMany'],
    },
  }
}
export default config;
