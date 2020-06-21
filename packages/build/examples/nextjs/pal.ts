import { Config } from '@paljs/types';

const config: Config = {
  backend: {
    generator: 'nexus-schema',
    onDelete: true,
  },
  frontEnd: {
    admin: true,
  },
};
export default config;
