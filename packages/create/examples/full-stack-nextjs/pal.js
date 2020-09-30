module.exports = {
  backend: {
    generator: 'nexus',
    onDelete: true,
    output: 'src/Api/graphql',
  },
  frontend: {
    admin: true,
  },
};
