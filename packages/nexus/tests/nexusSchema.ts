import { makeSchema } from 'nexus';
import { paljs, Settings } from '../src';
import { printSchema } from 'graphql';

export const generateSchema = <
  ModelName extends string = '',
  ModelsObject extends Record<string, Record<string, any>> = Record<string, { [key: string]: boolean }>,
>(
  settings?: Settings<ModelName, ModelsObject>,
) =>
  printSchema(
    makeSchema({
      types: [],
      plugins: [paljs(settings)],
      outputs: false,
    }),
  );
