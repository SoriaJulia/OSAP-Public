import { Credencial } from '@appTypes/credencial';
import User from '@appTypes/user';
import Button from '@components/Base/Button';
import InputField from '@components/Base/Fields/Input';
import TextAreaField from '@components/Base/Fields/TextArea';
import PageTitle from '@components/Base/PageTitle';
import axios from '@lib/axios';
import { SERVER_ERROR } from '@lib/constants';
import { capitalizeText, changeTextArea, changeTextInput, defaultQueryOptions, queryService } from '@lib/utils';
import { getCredencialesGrupo } from '@services/agente';
import { NEXT_URL } from 'config';
import useCredenciales, { GET_CREDENCIALES_QUERY_KEY } from 'hooks/credenciales/useCredenciales';
import _ from 'lodash';
import { GetServerSideProps, NextPage } from 'next';

import { getServerSession } from 'next-auth';
import Head from 'next/head';
import { nextAuthOptions } from 'pages/api/auth/[...nextauth]';
import { Info, PaperPlaneRight, SpinnerGap } from 'phosphor-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { dehydrate, QueryClient, useMutation } from '@tanstack/react-query';

const FormularioDeBaja: NextPage<{ user: User }> = ({ user }) => {
  const { credenciales, isLoading: isLoadingCredenciales } = useCredenciales(user.agentId);
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [seleccionados, setSeleccionados] = useState<Credencial[]>([]);

  const { isLoading, mutate } = useMutation(
    (data: FormData) => {
      return axios.post(`${NEXT_URL}/afiliado/${user.agentId}/credencial/baja`, data);
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
        setEmail('');
        setMensaje('');
        setSeleccionados([]);
      },
    }
  );

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('mensaje', mensaje);
    formdata.append('agentId', user.agentId);
    const afiliados = seleccionados.map((afi) => {
      return `- Afiliado: ${afi.Afiliado}, Numero: ${afi.Numero}`;
    });
    formdata.append('seleccionados', afiliados.join(' || '));
    mutate(formdata);
  };

  const handleSelectedAfiliados = (afiliado: Credencial) => {
    const list = seleccionados;
    if (list.length) {
      if (list.find((a) => a.Numero === afiliado.Numero)) {
        _.remove(list, (a) => a.Numero === afiliado.Numero);
      } else {
        list.push(afiliado);
      }
    } else {
      list.push(afiliado);
    }
    setSeleccionados(list);
  };

  return (
    <main className=" osap-container">
      <Head>
        <title>Baja - OSAP</title>
      </Head>
      <PageTitle title="Baja de servicio" subtitle="Pedí la baja de cualquier integrante de tu grupo familiar" />
      <form className="flex flex-wrap gap-4 rounded bg-white/50 p-8 shadow-sm ">
        <div className="rounded bg-slate-100/90 px-4 py-2">
          <p className="mb-3 text-slate-700">Afiliado/s a dar de baja</p>
          {isLoadingCredenciales && <SpinnerGap size={32} className="animate-spin" />}
          {credenciales.map((afiliado) => (
            <InputField
              labelPosition="right"
              label={capitalizeText(afiliado.Afiliado)}
              id={afiliado.Numero}
              onChange={() => {
                handleSelectedAfiliados(afiliado);
              }}
              className="mb-2 w-full"
              type="checkbox"
              inputWidth="w-full"
              key={afiliado.Numero}
            />
          ))}
        </div>
        <InputField
          id="Email"
          label="Email"
          inputWidth="w-full"
          className="mt-2 lg:w-full"
          type="email"
          required
          placeholder="juan@gmail.com"
          helpText="Necesitamos tu email para informarte avances sobre tu solicitud."
          onChange={changeTextInput(setEmail)}
          value={email}
        />

        <TextAreaField
          id="Mensaje"
          label="Motivo de baja"
          inputWidth="w-full"
          className="w-full"
          cols={500}
          rows={5}
          required
          placeholder="Dejanos tu mensaje..."
          onChange={changeTextArea(setMensaje)}
          value={mensaje}
        />
        <p className="flex items-center gap-2 text-sm text-slate-600">
          <Info size={18} className="shrink-0" /> La baja no se realizará automaticamente, queda pendiente de un
          analisis del estado de la cuenta corriente y las autorizaciones pendientes.
        </p>
        <div className="mt-2 flex w-full justify-end md:pr-10">
          <Button
            label={isLoading ? `Enviando...` : 'Enviar'}
            trailingIcon={
              isLoading ? <SpinnerGap className="animate-spin" weight="bold" size={24} /> : <PaperPlaneRight />
            }
            type="submit"
            onClick={handleSubmit}
            disabled={!email || !mensaje || seleccionados.length <= 0}
            showIconOnMobile
          />
        </div>
      </form>
    </main>
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

export default FormularioDeBaja;
