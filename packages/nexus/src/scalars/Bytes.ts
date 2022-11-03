import { GraphQLScalarType } from 'graphql';
import { ByteResolver } from 'graphql-scalars';
import { asNexusMethod } from 'nexus';

export const Bytes = asNexusMethod(
  new GraphQLScalarType({
    ...ByteResolver,
    // Override the default 'Byte' name with one that matches what Nexus Prisma expects.
    name: 'Bytes',
  }),
  'bytes',
);
