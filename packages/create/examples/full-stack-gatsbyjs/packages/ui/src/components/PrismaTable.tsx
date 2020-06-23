import React from 'react';
import { PrismaTable } from '@paljs/admin';
import { useUrlQuery } from './useUrlQuery';
import { navigate } from 'gatsby';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';

const Table: React.FC<{ model: string }> = ({ model }) => {
  const query = useUrlQuery();
  return <PrismaTable model={model} push={navigate} query={query} pagesPath="/models/" />;
};

export default Table;
