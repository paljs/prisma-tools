module.exports = {
  schema1: {
    schema: './prisma1/schema.prisma',
    backend: {
      prismaName: 'prisma1',
      generator: 'nexus',
      onDelete: true,
      output: 'src/server/graphql',
    },
    frontend: {
      admin: true,
    },
  },
  schema2: {
    schema: './prisma2/schema.prisma',
    backend: {
      prismaName: 'prisma2',
      generator: 'nexus',
      onDelete: true,
      output: 'src/server/graphql',
    },
    frontend: {
      admin: true,
    },
  },
};
