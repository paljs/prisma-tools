import { makeSchema } from 'nexus';
import { paljs, Settings } from '../src';
import { printSchema } from 'graphql';

export const generateSchema = (settings?: Settings) =>
  printSchema(
    makeSchema({
      types: [],
      plugins: [paljs(settings)],
      outputs: false,
    }),
  );
