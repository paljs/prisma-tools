import { GeneratePagesOptions } from '@paljs/types';
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

export function generatePages(options?: GeneratePagesOptions) {
  const schema = options?.schema ?? parseSchema('./prisma/adminSettings.json');
  const content = options?.pageContent ?? page;
  schema.models
    .filter((model) => !options?.models || options?.models.includes(model.name))
    .forEach((model) => {
      const fileContent = format(content.replace(/#{id}/g, model.id), {
        semi: true,
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 120,
        tabWidth: 2,
        parser: 'babel-ts',
      });
      createFile(
        options?.outPut ?? 'src/pages/admin/models/',
        `${model.id}.tsx`,
        fileContent,
      );
    });
}
