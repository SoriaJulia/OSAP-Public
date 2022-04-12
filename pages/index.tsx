import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

const Home: NextPage = () => {
  const { login } = useAuth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Osap</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <button
        onClick={() => {
          login({ user: '20016515', password: '20016515' });
        }}
      >
        LOG IN
      </button>
    </div>
  );
};

export default Home;
