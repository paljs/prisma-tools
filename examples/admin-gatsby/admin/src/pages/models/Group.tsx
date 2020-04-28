import React from 'react';
import SEO from '../../components/SEO';
import DynamicTable from '../../components/dynamicTable';

const Group: React.FC = () => {
  return (
    <>
      <SEO title="Group" />
      <DynamicTable model="Group" />
    </>
  );
};

export default Group;
