import * as React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { UserRoles } from 'types/enums';
import Layout from '../components/Layout/Layout';

function MyApp({ Component: PageComponent, pageProps: { session, ...pageProps } }: AppProps) {
  console.log(session);
  return (
    <SessionProvider session={session}>
      <Layout>
        <PageComponent {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
