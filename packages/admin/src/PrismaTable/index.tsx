import React from 'react';
import DynamicTable from './dynamicTable';
import { useQuery } from '@apollo/client';
import { GET_SCHEMA } from '../SchemaQueries';
import { ModelTableProps, ContextProps } from '..';
import { TableContext, defaultSettings } from './Context';
import Spinner from '@paljs/ui/Spinner';
import defaultLanguage from './language';

const PrismaTable: React.FC<ModelTableProps> = (props) => {
  const { data, loading } = useQuery<{ getSchema: ContextProps['schema'] }>(
    GET_SCHEMA,
  );
  if (loading) return <Spinner size="Large" />;
  const mergedLanguage = { ...defaultLanguage, ...props.language };
  return (
    <TableContext.Provider
      value={{
        schema: data?.getSchema ?? {
          models: [],
          enums: [],
        },
        ...(props as any),
        lang: mergedLanguage,
      }}
    >
      <DynamicTable model={props.model} />
    </TableContext.Provider>
  );
};

PrismaTable.defaultProps = defaultSettings;

export { PrismaTable, TableContext };
export * from './Table/Filters';
