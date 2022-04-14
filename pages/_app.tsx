import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPageContext } from 'next';
import Content from '../components/Content';
import AuthProvider, { useAuth } from '../context/AuthContext';
import React from 'react';
import Home from '.';

const authRoutes = ['/clientes'];

function MyApp({
  Component: PageComponent,
  pageProps,
  router,
  ...rest
}: AppProps) {
  const { user } = useAuth();

  let Page = PageComponent;

  if (!user && authRoutes.indexOf(router.route) >= -1) {
    Page = Home;
  }

  return (
    <Content>
      <Page {...pageProps} user={user} />
    </Content>
  );
}

const withAuthProvider = (Component: React.FC<AppProps>) => {
  return (props: AppProps) => (
    <AuthProvider>
      <Component {...props} />
    </AuthProvider>
  );
};

export default withAuthProvider(MyApp);
