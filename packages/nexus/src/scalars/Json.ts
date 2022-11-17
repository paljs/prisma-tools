import { GraphQLScalarType } from 'graphql';
import { JSONResolver } from 'graphql-scalars';
import { asNexusMethod } from 'nexus';

export const Json = asNexusMethod(
  new GraphQLScalarType({
    ...JSONResolver,
    // Override the default 'JsonObject' name with one that matches what Nexus Prisma expects.
    name: 'Json',
  }),
  'json',
);
