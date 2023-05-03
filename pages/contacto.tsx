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

const Contacto: NextPage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const { isLoading, mutate } = useMutation(
    (data: FormData) => {
      return axios.post(`${NEXT_URL}/contacto`, data);
    },
    {
      onSuccess: ({ data }) => {
        if (data.error) {
          toast.error(data.error, { position: 'bottom-right', duration: 6000 });
          return;
        }
        toast.success('Ya enviamos tu mensaje. ¡Gracias por contactarnos!.', {
          duration: 6000,
          position: 'bottom-right',
          iconTheme: { primary: '#2dd4bf', secondary: '#f0fdfa' },
        });
      },
      onError: (err) => {
        console.log(err);
        toast.error(SERVER_ERROR, { position: 'bottom-right', duration: 6000 });
      },
      onSettled: () => {
        setNombre('');
        setEmail('');
        setMensaje('');
        setAsunto('');
        setTelefono('');
      },
    }
  );

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formdata = new FormData();
    if (telefono) formdata.append('telefono', telefono);
    formdata.append('nombre', nombre);
    formdata.append('email', email);
    formdata.append('asunto', asunto);
    formdata.append('mensaje', mensaje);
    mutate(formdata);
  };

  return (
    <main className=" osap-container">
      <Head>
        <title>Contacto - OSAP</title>
        <meta name="description" content="Comunicate con OSAP" />
      </Head>
      <PageTitle title="Estamos para ayudarte" subtitle="Contactános por cualquiera de los siguientes medios" />
      <div className="grid gap-8 lg:grid-cols-2 ">
        <form className="flex flex-wrap gap-4 rounded bg-white/50 p-8 shadow-sm ">
          <h2 className="mb-2 w-full text-left text-2xl text-blue-700">Dejanos tu mensaje</h2>
          <InputField
            id="NyA"
            inputWidth="w-full"
            className="lg:w-full"
            label="Nombre y Apellido"
            required
            placeholder="Juan Perez"
            onChange={changeTextInput(setNombre)}
            value={nombre}
          />
          <InputField
            id="Email"
            label="Email"
            inputWidth="w-full"
            className="lg:w-full"
            type="email"
            required
            placeholder="juan@gmail.com"
            helpText="Necesitamos tu email para contestar tu consulta."
            onChange={changeTextInput(setEmail)}
            value={email}
          />
          <SelectField
            id="Asunto"
            label="Asunto"
            className="lg:w-full"
            inputWidth="w-full"
            required
            helpText="¿Por que motivo querés contactarnos?"
            onChange={(e) => setAsunto(e.target.value)}
            value={asunto}
          >
            <option value="">Seleccioná un asunto...</option>
            <option>Alta de usuario para Web OSAP</option>
            <option>Autorizaciones</option>
            <option>Beneficios</option>
            <option>Consultas</option>
            <option>Prestadores</option>
            <option>Quejas</option>
            <option>Reintegros</option>
            <option>Sugerencias</option>
            <option>Otros</option>
          </SelectField>
          <TextAreaField
            id="Mensaje"
            label="Mensaje"
            inputWidth="w-full"
            className="w-full"
            cols={500}
            rows={5}
            required
            placeholder="Dejanos tu mensaje..."
            onChange={changeTextArea(setMensaje)}
            value={mensaje}
          />
          <div className="mt-2 flex w-full justify-end md:pr-10">
            <Button
              label={isLoading ? `Enviando...` : 'Enviar'}
              trailingIcon={
                isLoading ? <SpinnerGap className="animate-spin" weight="bold" size={24} /> : <PaperPlaneRight />
              }
              type="submit"
              onClick={handleSubmit}
              disabled={!nombre || !email || !mensaje || !asunto}
              showIconOnMobile
            />
          </div>
        </form>
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
