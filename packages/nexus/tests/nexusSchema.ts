import { makeSchema } from 'nexus';
import { paljs, Settings } from '../src';
import { printSchema } from 'graphql';

export const generateSchema = <
  ModelName extends string = '',
  ModelsObject extends Record<ModelName, Record<string, any>> = Record<ModelName, Record<string, any>>,
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
