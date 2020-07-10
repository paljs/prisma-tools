module.exports = {
  backend: {
    generator: 'nexus-schema',
    onDelete: true,
    excludeQueriesAndMutations: ['aggregate'],
  },
}
