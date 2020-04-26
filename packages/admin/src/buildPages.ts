import { Schema } from "./types";
import { format } from "prettier";
import { writeFile } from "fs";

export function buildPages(schema: Schema, path: string) {
  schema.models.forEach((model) => {
    const fileContent = format(page(model.id, model.name), {
      semi: true,
      trailingComma: "all",
      singleQuote: true,
      printWidth: 120,
      tabWidth: 2,
      parser: "babel-ts",
    });
    writeFile(`${path}/${model.id}.tsx`, fileContent, () => {});
  });
}

const page = (id: string, name: string) => `
import React from 'react';
import SEO from '../../components/SEO';
import DynamicTable from '../../components/dynamicTable';

const ${id}: React.FC = () => {
  return (
    <>
      <SEO title="${name}" />
      <DynamicTable model="${id}" />
    </>
  );
};

export default ${id};
`;
