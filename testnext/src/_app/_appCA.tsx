import Head from 'next/head';
import { AppProps } from 'next/app';
import * as React from 'react';
import { NextPage } from 'next';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'server/client';
import AdminLayout from 'layouts/Admin';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme';

import '@paljs/admin/style.css';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();
  const admin = router.pathname.startsWith('/admin');
  return (
    <>
      <Head>
        <title>Great PalJs App</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          {admin ? (
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </ApolloProvider>
      </ChakraProvider>
    </>
  );
};

export default MyApp;
