import React from 'react';
import { Column } from 'react-table';
import { navigate } from '@reach/router';
import { BooleanFilter, DateTimeFilter, EnumFilter, NumberFilter, ObjectFilter, StringFilter } from './Filters';
import moment from 'moment';
import { Button } from 'oah-ui';
import { useModel } from '../useSchema';
import { getDisplayName } from './utils';
import { FieldFragment, ModelFragment } from '../../generated';

const columnsObject: { [key: string]: (field: FieldFragment, model?: ModelFragment | null) => Column } = {
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
    accessor: field.name,
    Filter: ObjectFilter(field),
    disableFilters: !field.filter,
    disableSortBy: true,
    Cell: ({ value }) => {
      const model = useModel(field.type);
      if (!model || !value) return <></>;
      return (
        <Button
          onClick={() => navigate(`/models/${field.type}?${model.idField}=${value[model.idField]}`)}
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
    Filter: ObjectFilter(field),
    disableFilters: !field.filter,
    disableSortBy: true,
    Cell: ({
      row: {
        original: { id },
      },
    }) => {
      if (!model) return <></>;
      return (
        <Button onClick={() => navigate(`/models/${field.type}?${model.id}=${id}`)} appearance="ghost" size="Small">
          Show
        </Button>
      );
    },
  }),
};

export const columns = (model?: ModelFragment | null) => {
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
