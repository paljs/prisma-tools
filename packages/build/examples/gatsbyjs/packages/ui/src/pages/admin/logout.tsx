import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { useApolloClient } from '@apollo/client';

const LogoutPage = () => {
  const client = useApolloClient();
  useEffect(() => {
    async function clear() {
      typeof localStorage !== 'undefined' && (await localStorage.removeItem('token'));
      await client.resetStore();
      await navigate('/auth/login');
    }
    clear();
  }, []);
  return <div />;
};

export default LogoutPage;
