import { NextPage } from 'next';
import Head from 'next/head';
import { Info, Warning, WarningCircle } from 'phosphor-react';
import React from 'react';
import PageTitle from '../components/Base/PageTitle';

const AsistenciaAlViajero: NextPage = () => {
  return (
    <section className="flex text-left">
      <Head>
        <title>Assist Travel - OSAP</title>
      </Head>
      <article>
        <PageTitle title="Asistencia al viajero" />
        <div className="flex flex-col gap-6 rounded bg-white p-4 text-lg lg:mr-4 2xl:mr-12">
          <p>
            OSAP ha suscripto un convenio de asistencia en tránsito para todos sus beneficiarios que se encuentren a{' '}
            <span className="font-semibold">mas de 100 km</span> de su domicilio.
            <p>
              La cobertura tiene alcance en <span className="font-semibold">todo el territorio nacional.</span>
            </p>
          </p>
          <p className="flex items-center gap-1 text-teal-500">
            <WarningCircle size={22} weight="bold" />
            Antes de viajar es necesario completar el siguiente formulario:{' '}
            <a href="https://assistravel.info/registro" className="underline" target="_blank">
              Registro de viaje
            </a>{' '}
          </p>
          <p className="text-orange-700">
            <strong>
              En caso de necesitar atención médica deberán comunicarse al{' '}
              <a href="tel:08004442774" className="underline decoration-orange-100">
                0800-4442774
              </a>
            </strong>
            , además consideramos importante agenden el número de WhatsApp de Assist Travel{' '}
            <a href="https://wa.me/+541152638406" className="underline decoration-orange-100">
              +54 11 52638406
            </a>{' '}
            para tener una comunicación mas rápida y eficiente.
          </p>
          <p>
            Al solicitar el servicio deberán identificarse como beneficiario de OSAP, y le harán algunas preguntas para
            ver cuál es el la complejidad de servicio que necesita para resolver su problema de salud.
          </p>
        </div>
      </article>
      <img src="./img/undraw_travelers.svg" alt="" className="mt-8 hidden w-2/5 p-4 pr-8 lg:block" />
    </section>
  );
};

export default AsistenciaAlViajero;
