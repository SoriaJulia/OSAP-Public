import Button from '@components/Base/Button';
import ContactLink from '@components/Base/ContactLink';
import PageTitle from '@components/Base/PageTitle';
import SelectField from '@components/Base/Fields/Select';
import TextAreaField from '@components/Base/Fields/TextArea';
import { SERVER_ERROR } from '@lib/constants';
import { changeTextArea, changeTextInput } from '@lib/utils';
import axios from 'axios';
import { NEXT_URL } from 'config';
import { NextPage } from 'next';
import Head from 'next/head';
import { SpinnerGap, PaperPlaneRight, MapPin, Phone, WhatsappLogo, Envelope, Calendar } from 'phosphor-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import InputField from '@components/Base/Fields/Input';
import FormContacto from '@components/FormContacto';

const Contacto: NextPage = () => {
  return (
    <main className=" osap-container">
      <Head>
        <title>Contacto - OSAP</title>
        <meta name="description" content="Comunicate con OSAP" />
      </Head>
      <PageTitle title="Estamos para ayudarte" subtitle="Contactános por cualquiera de los siguientes medios" />
      <div className="grid gap-8 lg:grid-cols-2 ">
        <FormContacto showBg showTitle />
        <div className="flex flex-col gap-2 p-8 text-left lg:ml-20 lg:mt-8">
          <h2 className="w-full text-2xl text-blue-700">Acercarte a nuestra oficina</h2>
          <ContactLink
            href="https://goo.gl/maps/Sm5zkopMbkXC4ojy5"
            label="Av. Moreno 187 - San Nicolás - BsAs"
            variant="black"
            target="_blank"
            icon={<MapPin size={24} />}
          />
          <p className="flex items-center gap-1">
            <Calendar size={24} />
            De Lunes a Viernes de 8 AM a 4 PM
          </p>
          <h2 className="mt-6 w-full text-2xl text-blue-700">Llamanos</h2>
          <div className="flex flex-wrap gap-2">
            <ContactLink href="tel:3364425632" label="(0336)4425632" variant="black" icon={<Phone size={24} />} />
            <ContactLink href="tel:3364429692" label="4429692" variant="black" />
            <ContactLink href="tel:3364450440" label="4450440" variant="black" />
            <ContactLink href="tel:3364450099" label="4450099" variant="black" />
          </div>
          <h2 className="mt-6 w-full text-2xl text-blue-700">Envianos un mensaje</h2>
          <ContactLink
            href="https://wa.me/+5491154529960"
            label="+54 9 11 54529960"
            variant="black"
            icon={<WhatsappLogo size={24} />}
          />
          <ContactLink
            href="mailto:info@osap.org.ar"
            label="info@osap.org.ar"
            variant="black"
            icon={<Envelope size={24} />}
          />
        </div>
      </div>
    </main>
  );
};

export default Contacto;
