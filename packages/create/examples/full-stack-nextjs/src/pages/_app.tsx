import Head from 'next/head';
import { AppProps } from 'next/app';
import * as React from 'react';
import { withApollo } from 'Api/client';
import { NextPage } from 'next';
import Layout from 'Layouts/Admin';

import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Prisma Admin</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default withApollo(MyApp);
