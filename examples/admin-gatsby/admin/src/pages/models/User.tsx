import React from 'react';
import SEO from '../../components/SEO';
import DynamicTable from '../../components/dynamicTable';

const User: React.FC = () => {
  return (
    <>
      <SEO title="User" />
      <DynamicTable model="User" />
    </>
  );
};

export default User;
