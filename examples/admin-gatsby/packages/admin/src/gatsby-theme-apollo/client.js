import fetch from 'isomorphic-fetch';
import { ApolloClient, HttpLink, ApolloLink, concat, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({ uri: 'http://localhost:4000', fetch });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem('token');
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
