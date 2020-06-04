import React from 'react';
import * as queryString from 'query-string';
import { ContextProps } from '..';

export const defaultSettings = {
  pagesPath: '/admin/models/',
  pageSizeOptions: [10, 20, 30, 40, 50, 100],
  paginationOptions: 4,
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
