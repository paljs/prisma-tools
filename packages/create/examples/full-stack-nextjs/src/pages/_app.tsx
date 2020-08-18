import Head from 'next/head';
import { AppProps } from 'next/app';
import * as React from 'react';
import { NextPage } from 'next';
import Layout from 'Layouts/Admin';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'Api/client';

import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <>
      <Head>
        <title>Job Dashboard</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
