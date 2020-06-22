import fetch from 'isomorphic-fetch';
import { ApolloClient, HttpLink, ApolloLink, concat, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({ uri: process.env.API_URL, fetch });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  }

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
  connectToDevTools: true,
});

export default client;
