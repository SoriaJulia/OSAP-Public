import * as React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import AuthProvider, { useAuth } from '../context/AuthContext';
import Home from './index';

const authRoutes = ['/afiliados', '/afiliados/turnosonline'];
const publicRoutes = ['/', '/faq', '/conoceOSAP'];

function MyApp({ Component: PageComponent, pageProps, router }: AppProps) {
  const { user } = useAuth();

  return (
    <Layout userRole={user?.role}>
      <PageComponent {...pageProps} user={user} />
    </Layout>
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
