const pageContent = `
import React from 'react';
import PrismaTable from '../../../components/PrismaTable';

const #{id}: React.FC = () => {
  return <PrismaTable model="#{id}" />;
};

export default #{id};
`

module.exports = {
  backend: {
    generator: 'nexus',
    adminSettingsPath: 'packages/server/adminSettings.json',
    output: 'packages/server/src/graphql',
    onDelete: true,
  },
  frontend: {
    admin: {
      outPut: 'packages/ui/src/pages/admin/models',
      pageContent,
    },
  },
}
