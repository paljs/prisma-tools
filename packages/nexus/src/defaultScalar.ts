import { scalarType } from 'nexus';
import { Settings } from './settings';

const defaultScalar = {
  Json: scalarType({
    name: 'Json',
    asNexusMethod: 'json',
    description: 'Json custom scalar type',
    serialize(value) {
      return value;
    },
  }),
  Decimal: scalarType({
    name: 'Decimal',
    asNexusMethod: 'decimal',
    description: 'Decimal custom scalar type',
    serialize: (val) => parseFloat(val),
    parseValue: (val) => parseFloat(val),
  }),
  BigInt: scalarType({
    name: 'BigInt',
    asNexusMethod: 'bigint',
    description: 'BigInt custom scalar type',
    serialize: (val) => parseInt(val),
    parseValue: (val) => parseInt(val),
  }),
  DateTime: scalarType({
    name: 'DateTime',
    asNexusMethod: 'date',
    description: 'Date custom scalar type',
    parseValue(value: any) {
      return value ? new Date(value) : null;
    },
    serialize(value: any) {
      return value ? new Date(value) : null;
    },
    parseLiteral(ast: any) {
      return ast.value ? new Date(ast.value) : null;
    },
  }),
};

export const getScalars = (excludeScalar: Settings['excludeScalar']) => {
  return (Object.keys(defaultScalar) as (keyof typeof defaultScalar)[])
    .filter((scalar) => !excludeScalar || !excludeScalar.includes(scalar))
    .map((scalar) => defaultScalar[scalar]);
};
