import { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import ListCentrosAtencion from '@components/ListCentrosAtencion';
import PageTitle from '../components/Base/PageTitle';

const CentrosAtencion: NextPage = () => {
  return (
    <div className="flex">
      <Head>
        <title>Centros de atención - OSAP</title>
        <meta name="description" content="Nuestros centros de atención, con sus respectivas direcciones y telefonos" />
      </Head>
      <section className=" osap-container text-left lg:w-3/5">
        <PageTitle title="Centros de atención" />
        <article className="rounded-sm bg-slate-50 p-4 text-left">
          <ListCentrosAtencion />
        </article>
      </section>
      <img className="hidden w-2/5 p-4 pr-8 pt-16 lg:block" src="./img/undraw_interview.svg" alt="" />
    </div>
  );
};

export default CentrosAtencion;
