import React from 'react';
import SEO from '../../components/SEO';
import DynamicTable from '../../components/dynamicTable';

const Comment: React.FC = () => {
  return (
    <>
      <SEO title="Comment" />
      <DynamicTable model="Comment" />
    </>
  );
};

export default Comment;
