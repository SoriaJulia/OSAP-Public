import ContactLink from '@components/Base/ContactLink';
import PageTitle from '@components/Base/PageTitle';
import TelefonosAtencion from '@components/TelefonosAtencion';
import TelefonosEmergencias from '@components/TelefonosEmergencias';
import { NextPage } from 'next';
import Head from 'next/head';
import { Car, FirstAid, Phone, WhatsappLogo } from 'phosphor-react';
import React from 'react';

const TelefonosUtiles: NextPage = () => {
  return (
    <div className=" osap-container">
      <Head>
        <title>Teléfonos útiles - OSAP</title>
        <meta
          name="description"
          content="Telefonos utiles para los afiliados de OSAP. Incluye telefonos de emergencia y de centros de atencion"
        />
      </Head>
      <PageTitle title="Teléfonos útiles" />
      <div className="flex flex-col gap-6 rounded bg-white p-4 py-6 md:columns-2">
        <TelefonosEmergencias />
        <article className="mt-6 flex flex-col gap-2 rounded bg-white text-left">
          <h2 className="mb-4 flex gap-2 font-display text-xl text-orange-600 sm:gap-3 sm:text-3xl">
            <FirstAid className="mt-1" /> Assist Travel <Car className="mt-1" />
          </h2>
          <p className="text-xl">En caso de necesitar atención médica desde cualquier otro lugar del pais:</p>
          <div className="flex flex-wrap gap-2 py-2">
            <Phone className="text-orange-500" weight="duotone" size={24} />
            <ContactLink href="tel:08004442774" variant="blue" label="0800-4442774" />

            <WhatsappLogo className="ml-4 text-orange-500" weight="duotone" size={24} />
            <ContactLink href="wa-me:+54 9 11 35869793." variant="blue" label="+54 9 11 35869793" />
          </div>
          <p className="text-gray-500">
            • Al solicitar el servicio deberán identificarse como beneficiario de OSAP, y le harán algunas preguntas
            para ver cuál es el la complejidad de servicio que necesita para resolver su problema de salud.
          </p>
        </article>
        <TelefonosAtencion />
      </div>
    </div>
  );
};

export default TelefonosUtiles;
