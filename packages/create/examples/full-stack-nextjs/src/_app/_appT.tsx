import Head from 'next/head';
import { AppProps } from 'next/app';
import * as React from 'react';
import { NextPage } from 'next';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'server/client';
import 'tailwindcss/tailwind.css';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <>
      <Head>
        <title>Great PalJs App</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
};

export default MyApp;
