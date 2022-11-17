/* eslint  @typescript-eslint/unbound-method: 0 */
import React from 'react';
import { ContextProps } from '../index';
import defaultLanguage from './language';

export const defaultSettings = {
  pagesPath: '/admin/models/',
  pageSize: 10,
  pageSizeOptions: [10, 20, 30, 40, 50, 100],
  paginationOptions: 4,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  push: typeof window !== 'undefined' ? window.location.replace : () => {},
  query: {},
};

const initialContext: ContextProps = {
  dir: 'ltr',
  lang: defaultLanguage,
  schema: {
    models: [],
    enums: [],
  },
  ...defaultSettings,
};

export const TableContext = React.createContext<ContextProps>(initialContext);
