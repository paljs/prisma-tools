import React, { useContext } from 'react';
import {
  BooleanFilter,
  DateTimeFilter,
  EnumFilter,
  NumberFilter,
  ObjectFilter,
  StringFilter,
} from './Filters';
import moment from 'moment';
import { Button } from 'oah-ui';
import { getDisplayName } from './utils';
import {
  SchemaField,
  SchemaModel,
  GetColumnsPartial,
  GetColumns,
} from '../../types';
import { TableContext } from '../Context';

const columnsObject: GetColumns = (field, model) => ({
  boolean: {
    Header: field.title,
    accessor: field.name,
    Filter: BooleanFilter,
    disableFilters: !field.filter,
    defaultCanSort: field.sort,
    Cell: ({ value }) => (value ? 'yes' : 'no'),
  },
  number: {
    Header: field.title,
    accessor: field.name,
    Filter: NumberFilter,
    disableFilters: !field.filter,
    disableSortBy: !field.sort,
  },
  enum: {
    Header: field.title,
    accessor: field.name,
    Filter: EnumFilter(field),
    disableFilters: !field.filter,
    disableSortBy: !field.sort,
  },
  DateTime: {
    Header: field.title,
    accessor: field.name,
    minWidth: 200,
    Filter: DateTimeFilter,
    disableFilters: !field.filter,
    disableSortBy: !field.sort,
    Cell: ({ value }) => (value ? moment(value).format('YYYY-MM-DD h:mm') : ''),
  },
  object: {
    Header: field.title,
    accessor: field.name,
    Filter: ObjectFilter(field),
    disableFilters: !field.filter,
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
        <Button
          onClick={() =>
            push(
              `${pagesPath}${field.type}?${model.idField}=${
                value[model.idField]
              }`,
            )
          }
          appearance="ghost"
          size="Small"
          fullWidth
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            padding: 0,
            textTransform: 'none',
          }}
        >
          {getDisplayName(value, model)}
        </Button>
      );
    },
  },
  string: {
    Header: field.title,
    accessor: field.name,
    Filter: StringFilter,
    disableFilters: !field.filter,
    disableSortBy: !field.sort,
  },
  list: {
    Header: field.title,
    accessor: field.name,
    Filter: ObjectFilter(field),
    disableFilters: !field.filter,
    disableSortBy: true,
    Cell: ({ row }) => {
      const { push, pagesPath } = useContext(TableContext);
      if (!model) return <></>;
      const id = (row.original as any).id;
      return (
        <Button
          onClick={() => push(`${pagesPath}${field.type}?${model.id}=${id}`)}
          appearance="ghost"
          size="Small"
        >
          Show
        </Button>
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
              default:
                return getColumn(field).string;
            }
          })
      : [];
  }, [model]);
};
