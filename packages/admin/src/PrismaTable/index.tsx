import React from 'react';
import DynamicTable from './dynamicTable';
import { Schema, FormInputs, GetColumnsPartial } from '../types';
import { useQuery } from '@apollo/client';
import { GET_SCHEMA } from '../SchemaQueries';
import * as queryString from 'query-string';

export interface ContextProps extends RequireContextProps, SameProps {
  schema: Schema;
  children?: React.ReactNode;
}

interface RequireContextProps {
  pagesPath: string;
  pageSizeOptions: number[];
  paginationOptions: number;
}

interface SameProps {
  tableColumns?: GetColumnsPartial;
  formInputs?: Partial<FormInputs>;
  push: (url: string) => void;
  query: { [key: string]: any };
}

interface ModelTableProps extends Partial<RequireContextProps>, SameProps {
  model: string;
}

const defaultSettings = {
  pagesPath: '/admin/models/',
  pageSizeOptions: [10, 20, 30, 40, 50, 100],
  paginationOptions: 4,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  push: typeof window !== 'undefined' ? window.location.replace : () => {},
  query:
    typeof window !== 'undefined'
      ? queryString.parse(window.location.search)
      : {},
};

const initialContext: ContextProps = {
  schema: {
    models: [],
    enums: [],
  },
  ...defaultSettings,
};

export const TableContext: React.Context<ContextProps> = React.createContext(
  initialContext,
);

const PrismaTable: React.FC<ModelTableProps> = (props) => {
  const { data } = useQuery<{ getSchema: ContextProps['schema'] }>(GET_SCHEMA);
  return (
    <TableContext.Provider
      value={{
        schema: data?.getSchema ?? {
          models: [],
          enums: [],
        },
        ...(props as any),
      }}
    >
      <DynamicTable model={props.model} />
    </TableContext.Provider>
  );
};

PrismaTable.defaultProps = defaultSettings;

export { PrismaTable };
