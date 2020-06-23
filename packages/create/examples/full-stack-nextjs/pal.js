module.exports = {
  backend: {
    generator: 'nexus-schema',
    onDelete: true,
    output: 'src/Api/graphql',
  },
  frontend: {
    admin: true,
  },
};
