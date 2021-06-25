import React, { useContext } from 'react';

import { getDisplayName } from './utils';
import {
  SchemaField,
  SchemaModel,
  GetColumnsPartial,
  GetColumns,
} from '../../types';
import { TableContext } from '../Context';
import { buttonClasses, classNames } from '../../components/css';

const columnsObject: GetColumns = (field, model) => ({
  boolean: {
    Header: field.title,
    accessor: field.name,
    disableFilters: !field.filter || field.list,
    defaultCanSort: field.sort,
    Cell: ({ value }) => {
      const { lang } = useContext(TableContext);
      return field.list ? value.join(',') : value ? lang.yes : lang.no;
    },
  },
  number: {
    Header: field.title,
    accessor: field.name,
    disableFilters: !field.filter || field.list,
    disableSortBy: !field.sort,
    Cell: ({ value }) => (field.list ? value.join(',') : value),
  },
  enum: {
    Header: field.title,
    accessor: field.name,
    disableFilters: !field.filter || field.list,
    disableSortBy: !field.sort,
    Cell: ({ value }) => (field.list ? value.join(',') : value),
  },
  DateTime: {
    Header: field.title,
    accessor: field.name,
    minWidth: 200,

    disableSortBy: !field.sort,
    Cell: ({ value }) => (value ? new Date(value).toLocaleString() : ''),
  },
  object: {
    Header: field.title,
    accessor: field.name,

    disableSortBy: true,
    Cell: ({ value }) => {
      const {
        schema: { models },
        push,
        pagesPath,
      } = useContext(TableContext);
      const model = models.find((item) => item.id === field.type);
      if (!model || !value) return <></>;
      return (
        <button
          onClick={() =>
            push(
              `${pagesPath}${field.type}?${model.idField}=${
                value[model.idField]
              }`,
            )
          }
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            padding: 0,
            textTransform: 'none',
          }}
          className={classNames(
            buttonClasses,
            'rounded-md py-2 px-4 bg-transparent text-blue-600 hover:bg-blue-100 hover:bg-opacity-25',
          )}
        >
          {getDisplayName(value, model)}
        </button>
      );
    },
  },
  string: {
    Header: field.title,
    accessor: field.name,
    disableFilters: !field.filter || field.list,
    disableSortBy: !field.sort,
    Cell: ({ value }) => (field.list ? value.join(',') : value),
  },
  json: {
    Header: field.title,
    accessor: field.name,
    disableFilters: true,
    disableSortBy: true,
    Cell: ({ value }) => (value ? JSON.stringify(value) : value),
  },
  list: {
    Header: field.title,
    accessor: field.name,

    disableSortBy: true,
    Cell: ({ row }) => {
      const { push, pagesPath, lang } = useContext(TableContext);
      if (!model) return <></>;
      const id = (row.original as any)[model.idField];
      return (
        <button
          className={classNames(
            buttonClasses,
            'rounded-md py-2 px-4 bg-transparent text-blue-600 hover:bg-blue-100 hover:bg-opacity-25',
          )}
          onClick={() => push(`${pagesPath}${field.type}?${model.id}=${id}`)}
        >
          {lang.show}
        </button>
      );
    },
  },
});

export const columns = (
  model?: SchemaModel,
  customColumns?: GetColumnsPartial,
) => {
  const getColumn = (field: SchemaField) => {
    return typeof customColumns !== 'undefined'
      ? {
          ...columnsObject(field, model),
          ...customColumns(field, model),
        }
      : columnsObject(field, model);
  };

  return React.useMemo(() => {
    return model
      ? model.fields
          .slice()
          .sort((a, b) => a.order - b.order)
          .filter((field) => field.read)
          .map((field) => {
            if (field.list && field.kind === 'object') {
              return getColumn(field).list;
            }
            if (field.kind !== 'scalar') {
              return getColumn(field)[field.kind];
            }
            switch (field.type) {
              case 'Int':
              case 'Float':
                return getColumn(field).number;
              case 'Boolean':
                return getColumn(field).boolean;
              case 'DateTime':
                return getColumn(field).DateTime;
              case 'String':
                return getColumn(field).string;
              case 'Json':
                return getColumn(field).json;
              default:
                return getColumn(field).string;
            }
          })
      : [];
  }, [model]);
};
