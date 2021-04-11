import Head from 'next/head';
import { AppProps } from 'next/app';
import * as React from 'react';
import { NextPage } from 'next';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'server/client';
// @material start
import AdminLayout from 'layouts/material';
// @material end
// @admin start
import '@paljs/admin/style.css';
// @admin end
// @tailwindcss start
//import AdminLayout from 'layouts/tailwind';
import 'tailwindcss/tailwind.css';
// @tailwindcss end
import { useRouter } from 'next/router';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();
  // @material start
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  // @material end
  // @admin start
  const admin = router.pathname.startsWith('/admin');
  // @admin end
  return (
    <>
      <Head>
        <title>Great PalJs App</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <ApolloProvider client={apolloClient}>
        {/*@admin start*/}
        {admin ? (
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        ) : (
          // @admin end
          <Component {...pageProps} />
          // @admin start
        )}
        {/* @admin end*/}
      </ApolloProvider>
    </>
  );
};

export default MyApp;
