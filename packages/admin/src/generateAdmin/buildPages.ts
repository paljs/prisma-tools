import { GeneratePagesOptions } from '../types';
import { format } from 'prettier';
import { createFile } from './createFile';
import { parseSchema } from './mergeSchema';

const page = `
import React from 'react';
import PrismaTable from 'Components/PrismaTable';

const #{id}: React.FC = () => {
  return <PrismaTable model="#{id}" />;
};

export default #{id};
`;

export function generatePages(options: GeneratePagesOptions) {
  const schema = options.schema ?? parseSchema('./prisma/schema.json');
  const content = options.pageContent ?? page;
  schema.models.forEach((model) => {
    const fileContent = format(content.replace(/#{id}/g, model.id), {
      semi: true,
      trailingComma: 'all',
      singleQuote: true,
      printWidth: 120,
      tabWidth: 2,
      parser: 'babel-ts',
    });
    createFile(options.outPut ?? '', `${model.id}.tsx`, fileContent);
  });
}
