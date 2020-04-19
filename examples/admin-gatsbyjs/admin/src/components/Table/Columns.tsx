import React from 'react';
import { Column } from 'react-table';
import { BooleanFilter, DateTimeFilter, EnumFilter, NumberFilter, StringFilter } from './Filters';
import moment from 'moment';
import { Link } from 'gatsby';
import { SchemaModel, SchemaField } from '@prisma-tools/admin';

const columnsObject: { [key: string]: (field: SchemaField, model?: SchemaModel | null) => Column } = {
  boolean: (field) => ({
    Header: field.title,
    accessor: field.name,
    Filter: BooleanFilter,
    disableFilters: !field.filter,
    defaultCanSort: field.sort,
    Cell: ({ value }) => (value ? 'true' : 'false'),
  }),
  number: (field) => ({
    Header: field.title,
    accessor: field.name,
    Filter: NumberFilter,
    disableFilters: !field.filter,
    disableSortBy: !field.sort,
  }),
  enum: (field) => ({
    Header: field.title,
    accessor: field.name,
    Filter: EnumFilter(field),
    disableFilters: !field.filter,
    disableSortBy: !field.sort,
  }),
  DateTime: (field) => ({
    Header: field.title,
    accessor: field.name,
    minWidth: 200,
    Filter: DateTimeFilter,
    disableFilters: !field.filter,
    disableSortBy: !field.sort,
    Cell: ({ value }) => (value ? moment(value).format('YYYY-MM-DD h:mm') : ''),
  }),
  object: (field) => ({
    Header: field.title,
    accessor: field.name + '.id',
    Filter: NumberFilter,
    disableFilters: !field.filter,
    disableSortBy: !field.sort,
    Cell: ({ value }) =>
      value ? (
        <Link to={`/models/${field.type}`} state={{ id: value }}>
          {value}
        </Link>
      ) : (
        ''
      ),
  }),
  Default: (field) => ({
    Header: field.title,
    accessor: field.name,
    disableFilters: true,
  }),
  string: (field) => ({
    Header: field.title,
    accessor: field.name,
    Filter: StringFilter,
    disableFilters: !field.filter,
    disableSortBy: !field.sort,
  }),
  list: (field, model) => ({
    Header: field.title,
    accessor: field.name,
    disableFilters: true,
    disableSortBy: true,
    Cell: ({
      row: {
        original: { id },
      },
    }) =>
      id && model ? (
        <Link to={`/models/${field.type}`} state={{ [model.id]: id }}>
          Show
        </Link>
      ) : (
        ''
      ),
  }),
};

export const columns = (model?: SchemaModel | null) => {
  return React.useMemo(() => {
    return model
      ? model.fields
          .slice()
          .sort((a, b) => a.order - b.order)
          .filter((field) => field.read)
          .map((field) => {
            if (field.list && field.kind === 'object') {
              return columnsObject['list'](field, model);
            }
            if (field.kind !== 'scalar') {
              return columnsObject[field.kind](field);
            }
            switch (field.type) {
              case 'Int':
              case 'Float':
                return columnsObject['number'](field);
              case 'Boolean':
                return columnsObject['boolean'](field);
              case 'DateTime':
                return columnsObject['DateTime'](field);
              case 'String':
                return columnsObject['string'](field);
              default:
                return columnsObject['Default'](field);
            }
          })
      : [];
  }, [model]);
};
