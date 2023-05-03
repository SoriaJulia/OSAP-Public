/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defaultQueryOptions } from '@lib/utils';
import { Session } from 'next-auth';
import Layout from '../components/Layout/Layout';

const noLayoutPages = ['/login'];

interface PageProps {
  session: Session;
  dehydratedState: unknown;
}
interface CustomAppProps extends AppProps<PageProps> {
  Component: AppProps['Component'];
}

function MyApp({ Component: PageComponent, pageProps: { session, ...pageProps } }: CustomAppProps) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: defaultQueryOptions } }));
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <Toaster />
          <Script
            strategy="lazyOnload"
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <Script strategy="lazyOnload">
            {`  
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {page_path: window.location.pathname,});
            `}
          </Script>
          {noLayoutPages.includes(router.pathname) ? (
            <PageComponent {...pageProps} />
          ) : (
            <Layout>
              <AnimatePresence exitBeforeEnter>
                <PageComponent {...pageProps} />
              </AnimatePresence>
            </Layout>
          )}
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
