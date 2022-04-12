import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Content from '../components/Content';

function MyApp({ Component, pageProps }: AppProps) {
  const isLogged = true;
  return isLogged ? (
    <Content>
      <Component {...pageProps} />
    </Content>
  ) : (
    <Content>
      <Component {...pageProps} />
    </Content>
  );
}

export default MyApp;
