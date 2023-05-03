import User from '@appTypes/user';
import Button from '@components/Base/Button';
import axios from 'axios';
import InputField from '@components/Base/Fields/Input';
import SelectField from '@components/Base/Fields/Select';
import TextAreaField from '@components/Base/Fields/TextArea';
import PageTitle from '@components/Base/PageTitle';
import {
  capitalizeText,
  changeFileInput,
  changeTextArea,
  changeTextInput,
  defaultQueryOptions,
  queryService,
} from '@lib/utils';
import { getCredencialesGrupo } from '@services/agente';
import { NEXT_URL } from 'config';
import useCredenciales, { GET_CREDENCIALES_QUERY_KEY } from 'hooks/credenciales/useCredenciales';
import { GetServerSideProps, NextPage } from 'next';

import { getServerSession } from 'next-auth';
import { nextAuthOptions } from 'pages/api/auth/[...nextauth]';
import { PaperPlaneRight, SpinnerGap } from 'phosphor-react';
import React, { useRef, useState } from 'react';
import { dehydrate, QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { SERVER_ERROR } from '@lib/constants';
import { redirect } from 'next/dist/server/api-utils';
import Head from 'next/head';

const Certificados: NextPage<{ user: User }> = ({ user }) => {
  const { credenciales, isLoading: isLoadingCredenciales } = useCredenciales(user.agentId);
  const [dni, setDNI] = useState('');
  const [certificado, setCertificado] = useState<File[]>([]);
  const [mensaje, setMensaje] = useState('');
  const [email, setEmail] = useState('');
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const { isLoading, mutate } = useMutation(
    (data: FormData) => {
      return axios.post(`${NEXT_URL}/afiliado/${user.agentId}/credencial/certificado`, data);
    },
    {
      onSuccess: ({ data }) => {
        if (data.error) {
          toast.error(data.error, { position: 'bottom-right', duration: 6000 });
          return;
        }
        toast.success('¡Gracias por enviarnos el certificado!', {
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
        setDNI('');
        setMensaje('');
        setEmail('');
        setCertificado([]);
        if (inputFileRef.current) inputFileRef.current.value = '';
      },
    }
  );

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const afiliado = credenciales.find((af) => af.Documento.toString() === dni);

    const formdata = new FormData();
    if (certificado) formdata.append('certificado', certificado[0]);
    if (afiliado) {
      formdata.append('nombre', afiliado.Afiliado);
      formdata.append('nroAfiliado', afiliado.Numero);
      formdata.append('nroDoc', afiliado.Documento);
    }
    formdata.append('mensaje', mensaje);
    formdata.append('email', email);
    mutate(formdata);
  };

  return (
    <div className=" osap-container">
      <Head>
        <title>Certificado de estudio - OSAP</title>
      </Head>
      <PageTitle
        title="Certificado de estudio"
        subtitle="Extendé la cobertura de un integrante de tu familia hasta el dia que cumpla 26 años"
      />
      <form className="flex flex-wrap gap-4 gap-x-8 rounded bg-white/50 p-8 shadow-sm lg:mr-40 lg:px-12">
        {isLoadingCredenciales ? (
          <SelectField
            id="Afiliado"
            helpText="Seleccioná el afiliado al que corresponde el certificado"
            label="Afiliado"
            required
            disabled
            className="lg:w-6/12"
          >
            <option>Cargando...</option>
          </SelectField>
        ) : (
          <SelectField
            id="Afiliado"
            onChange={(e) => setDNI(e.target.value)}
            value={dni}
            helpText="Seleccioná el afiliado al que corresponde el certificado"
            label="Afiliado"
            required
            className="lg:w-6/12"
          >
            {credenciales.map((credencial) => (
              <option value={credencial.Documento} key={credencial.Documento}>
                {capitalizeText(credencial.Afiliado)}
              </option>
            ))}
          </SelectField>
        )}
        <InputField
          label="Email"
          helpText="Dejanos tu email para poder contactarnos y responder tu solicitud"
          placeholder="juan@gmail.com"
          type="email"
          id="Email"
          onChange={changeTextInput(setEmail)}
          value={email}
          required
          className="lg:w-5/12"
        />
        <InputField
          id="Certificado"
          label="Certificado de Estudio"
          type="file"
          accept="image/*,.pdf"
          onChange={changeFileInput(setCertificado)}
          ref={inputFileRef}
          helpText="Imagen o .pdf del certificado"
          className="lg:w-5/12"
          required
        />
        <TextAreaField
          id="Mensaje"
          label="Mensaje"
          onChange={changeTextArea(setMensaje)}
          value={mensaje}
          placeholder="¿Necesitas aclarandos algo? dejanos tu mensaje acá"
          className="lg:w-6/12"
        />
        <div className="mt-2 flex w-full justify-end md:pr-10">
          <Button
            label={isLoading ? `Enviando...` : 'Enviar'}
            trailingIcon={
              isLoading ? <SpinnerGap className="animate-spin" weight="bold" size={24} /> : <PaperPlaneRight />
            }
            type="submit"
            onClick={handleSubmit}
            disabled={!certificado[0] || !email}
            showIconOnMobile
          />
        </div>
      </form>
    </div>
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
  const { agentId } = session.user;
  if (agentId === '0') {
    return { redirect: { destination: '/prestadores', permanent: false } };
  }

  const queryClient = new QueryClient({ defaultOptions: { queries: defaultQueryOptions } });

  queryClient.prefetchQuery([GET_CREDENCIALES_QUERY_KEY, agentId], queryService(getCredencialesGrupo, agentId));

  return {
    props: {
      user: session.user,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Certificados;
