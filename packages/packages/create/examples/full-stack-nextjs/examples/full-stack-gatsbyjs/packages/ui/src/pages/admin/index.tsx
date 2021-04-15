import React from 'react';
import SEO from '../../components/SEO';
import { Settings } from '@paljs/admin';

const Home = () => {
  return (
    <div>
      <SEO title="Settings page" />
      <Settings />
    </div>
  );
};
export default Home;
