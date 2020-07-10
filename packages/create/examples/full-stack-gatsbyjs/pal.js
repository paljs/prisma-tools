const pageContent = `
import React from 'react';
import PrismaTable from '../../../components/PrismaTable';

const #{id}: React.FC = () => {
  return <PrismaTable model="#{id}" />;
};

export default #{id};
`

module.exports = {
  schemaFolder: 'packages/server/prisma',
  backend: {
    generator: 'nexus-schema',
    output: 'packages/server/src/graphql',
    onDelete: true,
    excludeQueriesAndMutations: ['aggregate'],
  },
  frontend: {
    admin: {
      outPut: 'packages/ui/src/pages/admin/models',
      pageContent,
    },
  },
}
