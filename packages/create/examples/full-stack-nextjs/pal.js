module.exports = {
  backend: {
    generator: 'nexus-schema',
    onDelete: true,
    output: 'src/Api/graphql',
    excludeQueriesAndMutations: ['aggregate'],
  },
  frontend: {
    admin: true,
  },
};
