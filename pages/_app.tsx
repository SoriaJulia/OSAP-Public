import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Content from '../components/Content';
import AuthProvider from '../context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Content>
        <Component {...pageProps} />
      </Content>
    </AuthProvider>
  );
}

export default MyApp;
