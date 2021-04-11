module.exports = {
  backend: {
    generator: 'nexus',
    onDelete: true,
    output: 'src/server/graphql',
  },
  frontend: {
    admin: true,
  },
};
