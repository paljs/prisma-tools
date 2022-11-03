import { asNexusMethod } from 'nexus';
import * as DecimalJs from 'decimal.js';
import { GraphQLScalarType, Kind } from 'graphql';

export const Decimal = asNexusMethod(
  /**
   * Copied from prisma-graphql-type-decimal.
   *
   * @see https://github.com/unlight/prisma-graphql-type-decimal
   */
  new GraphQLScalarType({
    name: 'Decimal',
    description: 'An arbitrary-precision Decimal type',
    /**
     * Value sent to the client
     */
    serialize(value) {
      return (value as DecimalJs.Decimal).toString();
    },
    /**
     * Value from the client
     */
    parseValue(value) {
      return new DecimalJs.Decimal(value as DecimalJs.Decimal.Value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT || ast.kind === Kind.FLOAT || ast.kind === Kind.STRING) {
        return new DecimalJs.Decimal(ast.value);
      }
      return null;
    },
  }),
  'decimal',
);
