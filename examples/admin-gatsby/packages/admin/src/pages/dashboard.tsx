import React from 'react';
import SEO from '../components/SEO';
import { Settings } from '../components/Settings';

const Home = () => {
  return (
    <div>
      <SEO title="Home" keywords={['OAH', 'application', 'react']} />
      <Settings />
    </div>
  );
};
export default Home;
