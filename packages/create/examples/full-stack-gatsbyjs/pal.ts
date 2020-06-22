import { Config } from '@paljs/types'

const pageContent = `
import React from 'react';
import PrismaTable from '../../../components/PrismaTable';

const #{id}: React.FC = () => {
  return <PrismaTable model="#{id}" />;
};

export default #{id};
`

const config: Config = {
  schemaFolder: 'server/prisma',
  backend: {
    generator: 'nexus-schema',
    output: 'server/src/graphql',
    onDelete: true,
  },
  frontend: {
    admin: {
      outPut: 'ui/src/pages/admin/models',
      pageContent,
    },
  },
}
export default config
