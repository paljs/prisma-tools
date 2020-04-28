import React from 'react';
import SEO from '../../components/SEO';
import DynamicTable from '../../components/dynamicTable';

const Post: React.FC = () => {
  return (
    <>
      <SEO title="Post" />
      <DynamicTable model="Post" />
    </>
  );
};

export default Post;
