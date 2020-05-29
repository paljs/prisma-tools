import { Schema } from './types';
import { format } from 'prettier';
import { createFile } from './createFile';

export function buildPages(schema: Schema, path: string) {
  schema.models.forEach((model) => {
    const fileContent = format(page(model.id, model.name), {
      semi: true,
      trailingComma: 'all',
      singleQuote: true,
      printWidth: 120,
      tabWidth: 2,
      parser: 'babel-ts',
    });
    createFile(path, `${model.id}.tsx`, fileContent);
  });
}

const page = (id: string, name: string) => `
import React from 'react';
import DynamicTable from 'Components/Admin/dynamicTable';

const ${id}: React.FC = () => {
  return <DynamicTable model="${id}" />;
};

export default ${id};
`;
