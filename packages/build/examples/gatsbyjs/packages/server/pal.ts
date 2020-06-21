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
  backend: {
    generator: 'nexus-schema',
    onDelete: true,
  },
  frontEnd: {
    admin: {
      outPut: '../ui/src/pages/admin/models',
      pageContent,
    },
  },
}
export default config
