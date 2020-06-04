import React from 'react';
import DynamicTable from './dynamicTable';
import { useQuery } from '@apollo/client';
import { GET_SCHEMA } from '../SchemaQueries';
import { ModelTableProps, ContextProps } from '..';
import { TableContext, defaultSettings } from './Context';

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
