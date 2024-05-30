import React from 'react';
import { useQuery } from '@apollo/client';

import Spinner from '../components/Spinner';
import DynamicTable from './dynamicTable';
import { GET_SCHEMA } from '../SchemaQueries';
import { ModelTableProps, ContextProps } from '../index';
import { TableContext, defaultSettings } from './Context';
import defaultLanguage from './language';

const PrismaTable: React.FC<ModelTableProps> = ({ children, language, model, ...rest }) => {
  const { data, loading } = useQuery<{ getSchema: ContextProps['schema'] }>(GET_SCHEMA);
  if (loading) return <Spinner />;
  const mergedLanguage = { ...defaultLanguage, ...language };
  return (
    <TableContext.Provider
      value={{
        schema: data?.getSchema ?? {
          models: [],
          enums: [],
        },
        ...({ ...defaultSettings, ...rest } as any),
        lang: mergedLanguage,
      }}
    >
      <DynamicTable model={model}>{children}</DynamicTable>
    </TableContext.Provider>
  );
};

export { PrismaTable, TableContext };
export * from './Table/Filters';
export * from './Form/Inputs';
