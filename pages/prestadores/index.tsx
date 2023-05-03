import PadronAfiliados from '@components/PadronAfiliados/Consulta';
import React from 'react';
import User from '@appTypes/user';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { getServerSession } from 'next-auth';
import { nextAuthOptions } from 'pages/api/auth/[...nextauth]';

const Prestadores = ({ user }: { user: User }) => {
  return (
    <>
      <Head>
        <title>Padrón Afiliados - OSAP</title>
      </Head>

      <PadronAfiliados />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  if (session.user.agentId !== '0' && !session.user.proveedorId) {
    return {
      redirect: {
        destination: '/afiliados',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};

export default Prestadores;
