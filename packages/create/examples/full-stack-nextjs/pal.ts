import { Config } from '@paljs/types';

const config: Config = {
  backend: {
    generator: 'nexus-schema',
    onDelete: true,
  },
  frontend: {
    admin: true,
  },
};
export default config;
