import { Schema, Options } from '../types';
import { format } from 'prettier';
import { createFile } from './createFile';

const page = `
import React from 'react';
import PrismaTable from 'Components/PrismaTable';

const #{id}: React.FC = () => {
  return <PrismaTable model="#{id}" />;
};

export default #{id};
`;

export function buildPages(schema: Schema, options: Options) {
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
    createFile(options.pagesOutput, `${model.id}.tsx`, fileContent);
  });
}
