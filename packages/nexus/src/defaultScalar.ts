import { Settings } from './settings';
import { BigInt } from './scalars/BigInt';
import { Bytes } from './scalars/Bytes';
import { DateTime } from './scalars/DateTime';
import { Decimal } from './scalars/Decimal';
import { Json } from './scalars/Json';

const defaultScalar = {
  BigInt,
  Bytes,
  DateTime,
  Decimal,
  Json,
};

export const getScalars = (excludeScalar: Settings['excludeScalar']) => {
  return (Object.keys(defaultScalar) as (keyof typeof defaultScalar)[])
    .filter((scalar) => !excludeScalar || !excludeScalar.includes(scalar))
    .map((scalar) => defaultScalar[scalar]);
};
