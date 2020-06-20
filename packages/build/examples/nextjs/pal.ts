import { Config } from '@paljs/types';

const config: Config = {
  backend: {
    generator: 'nexus-schema',
    onDelete: true,
  },
  frontEnd: {
    pages: true,
  }
}
export default config;
