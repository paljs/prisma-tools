// @ts-check

/**
 * @type {import('@paljs/types').Config}
 **/

module.exports = {
  backend: {
    generator: 'nexus',
    output: 'src/server/graphql',
  },
  frontend: {
    admin: true,
  },
};
