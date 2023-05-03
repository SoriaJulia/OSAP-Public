import { defaultQueryOptions, queryService } from '@lib/utils';
import { getUltimasNovedades } from '@services/novedades';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import useNovedades, { GET_NOVEDADES_QUERY_KEY } from 'hooks/novedades/useNovedades';
import useScrollListener from 'hooks/useScrollListener';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { SpinnerGap } from 'phosphor-react';
import { useEffect, useState } from 'react';
import Modal from '../components/Base/Modal';
import Card from '../components/Novedades/Card';
import PublicSectionsNav from '../components/PublicSectionsNav';
import TelefonosAtencion from '../components/TelefonosAtencion';
import TelefonosEmergencias from '../components/TelefonosEmergencias';
import TerniumBanner from '../components/TerniumBanner';

const Home: NextPage = () => {
  const { novedades, isLoading } = useNovedades();
  const [showModal, setShowModal] = useState(false);
  const [showTernium, setShowTernium] = useState(true);
  const scroll = useScrollListener();
  useEffect(() => {
    if (scroll.y !== 0) setShowTernium(false);
    if (scroll.y === 0) setShowTernium(true);
  }, [scroll.y]);

  return (
    <div className="flex min-h-screen flex-col items-center pb-2">
      <Head>
        <title>OSAP - Obra Social Aceros Paraná</title>
        <meta name="description" content="Obra social de los empleados de Ternium Argentina" />
      </Head>
      <PublicSectionsNav />
      <section className=" osap-container grid gap-12 bg-gradient-to-r from-white/20 via-white/90 to-white/20 lg:grid-cols-2">
        <TelefonosEmergencias />
        <TelefonosAtencion />
      </section>
      <section className="mt-24 flex items-center gap-3  bg-gradient-to-r from-yellow-200 to-orange-50 ">
        <h2 className="flex items-center rounded-e-full bg-orange-600/70 p-12 font-display text-xl text-orange-25 lg:text-4xl xl:px-32">
          Sobre Nosotros
        </h2>
        <p className="p-8 text-slate-700  lg:p-20 lg:text-2xl">
          En OSAP administramos los fondos del personal de TERNIUM ARGENTINA para el cuidado de la salud, proyectándonos
          hacia una atención rápida y con un mínimo de trámites administrativos para nuestros{' '}
          <span className="font-bold"> más de 23.000 beneficiarios.</span>
        </p>
      </section>
      <section className="flex items-center gap-3 bg-gradient-to-r from-yellow-200 to-orange-50 ">
        <p className="p-8 text-slate-700  lg:p-20 lg:text-2xl">
          Proveemos la mejor atención a través de nuestra red de servicios médicos asistenciales, con profesionales en
          todas las especialidades médicas, diagnósticos y servicios complementarios y servicios de emergencia las 24hs
          todos los días del año.
        </p>
        <h2 className="flex items-center rounded-s-full bg-orange-600/70 p-12 font-display text-xl text-orange-25 lg:text-4xl xl:px-32">
          Nuestro Servicio
        </h2>
      </section>
      <section className=" osap-container mb-4 mt-24 w-full">
        <div className="flex justify-between">
          <h2 className="font-display text-4xl text-grey-500/80">Nuestras últimas novedades</h2>
          <a href="/novedades" className="btn-text-blue">
            Ver todas
          </a>
        </div>
        <div className="mt-12 grid justify-evenly gap-11 auto-fit-fixed-[380px] xl:justify-between">
          {isLoading && <SpinnerGap className="animate-spin" />}
          {novedades.length > 0 &&
            novedades.map((novedad) => {
              return <Card novedad={novedad} key={novedad._id} />;
            })}
        </div>
      </section>
      <TerniumBanner classname={`${showTernium ? 'scale-y-100' : 'scale-y-0'}`} />

      <Modal
        show={showModal}
        onDismiss={() => {
          setShowModal(false);
        }}
        title=""
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const queryClient = new QueryClient({ defaultOptions: { queries: defaultQueryOptions } });

  queryClient.prefetchQuery([GET_NOVEDADES_QUERY_KEY], queryService(getUltimasNovedades));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
