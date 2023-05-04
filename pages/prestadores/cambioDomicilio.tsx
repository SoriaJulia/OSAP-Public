import User from '@appTypes/user';
import Button from '@components/Base/Button';
import InputField from '@components/Base/Fields/Input';
import PageTitle from '@components/Base/PageTitle';
import { SERVER_ERROR } from '@lib/constants';
import { changeTextInput } from '@lib/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { NEXT_URL } from 'config';
import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth';
import Head from 'next/head';
import { nextAuthOptions } from 'pages/api/auth/[...nextauth]';
import { MapPinLine, Envelope, DeviceMobile, Phone, UserRectangle, Warning } from 'phosphor-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const CambioDomicilio: NextPage<{ user: User }> = ({ user }) => {
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [piso, setPiso] = useState('');
  const [depto, setDepto] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [tel, setTel] = useState('');
  const sendEnabled = calle && numero && localidad;
  const cleanForm = () => {
    setCalle('');
    setNumero('');
    setPiso('');
    setLocalidad('');
    setTel('');
    setCelular('');
    setEmail('');
  };
  const { isLoading, mutate } = useMutation(
    (data: FormData) => {
      return axios.post(`${NEXT_URL}/prestador/${user.proveedorId}/domicilio`, data);
    },
    {
      onSuccess: ({ data }) => {
        if (data.error) {
          toast.error(data.error, { position: 'bottom-right', duration: 6000 });
          return;
        }
        toast.success('Ya enviamos tu mensaje. ¡Gracias por actualizar tus datos!.', {
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
        cleanForm();
      },
    }
  );

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('calle', calle);
    formdata.append('numero', numero);
    formdata.append('piso', piso);
    formdata.append('depto', depto);
    formdata.append('localidad', localidad);
    formdata.append('telefono', tel);
    formdata.append('celular', celular);
    formdata.append('email', email);
    formdata.append('nombre', user.name);
    mutate(formdata);
  };

  return (
    <div className="osap-container">
      <Head>
        <title>Cambio de domicilio de atención - OSAP</title>
      </Head>
      <PageTitle title="Informar cambio de domicilio de atención" />
      <form className="rounded bg-white p-6">
        <div className="">
          <h2 className="mb-4 flex items-start text-2xl text-blue-500">Domicilio de atención</h2>
          <p className="flex flex-wrap items-center gap-2  text-blue-700">
            <MapPinLine size={22} />
            <InputField
              className="w-80"
              id="calle"
              placeholder={calle}
              labelPosition="left"
              label="Calle"
              value={calle}
              onChange={changeTextInput(setCalle)}
              required
            />
            <InputField
              className="w-32"
              id="nro"
              placeholder={numero}
              labelPosition="left"
              label=" Nº"
              value={numero}
              onChange={changeTextInput(setNumero)}
              required
            />
            <InputField
              className="w-28"
              id="piso"
              placeholder={piso}
              labelPosition="left"
              label="Piso"
              value={piso}
              onChange={changeTextInput(setPiso)}
            />
            <InputField
              className="w-52"
              id="depto"
              placeholder={depto}
              labelPosition="left"
              label="Departamento"
              value={depto}
              onChange={changeTextInput(setDepto)}
            />
            <InputField
              className=" w-96"
              id="localidad"
              placeholder={localidad}
              labelPosition="left"
              label="Localidad"
              value={localidad}
              onChange={changeTextInput(setLocalidad)}
              required
            />
          </p>
        </div>
        <div className="my-8">
          <h2 className="mb-4 flex items-start text-2xl text-blue-500">Contacto</h2>
          <p className="ml-4 flex flex-wrap items-center gap-2 text-blue-700">
            <InputField
              className="w-64"
              id="email"
              placeholder={email}
              type="email"
              labelPosition="left"
              label={<Envelope size={22} />}
              ariaLabel="Email"
              value={email}
              onChange={changeTextInput(setEmail)}
            />
            <InputField
              className="w-64"
              id="cel"
              placeholder={celular}
              labelPosition="left"
              label={<DeviceMobile size={22} />}
              ariaLabel="Celular"
              value={celular}
              onChange={changeTextInput(setCelular)}
            />
            <InputField
              className="w-64"
              id="tel"
              placeholder={tel}
              labelPosition="left"
              label={<Phone size={22} />}
              ariaLabel="Telefono"
              value={tel}
              onChange={changeTextInput(setTel)}
            />
          </p>
        </div>

        <p className="my-4 flex items-center gap-2 rounded-md bg-amber-50 p-2 text-yellow-900">
          <Warning size={28} weight="duotone" /> Los cambios no se veran reflejados automaticamente. Vamos a revisarlos
          e impactarlos manualmente en el sistema de cartilla{' '}
        </p>

        <div className="flex justify-end gap-3">
          <Button label="Cancelar" variant="yellowFill" onClick={cleanForm} />
          <Button label="Enviar" disabled={!sendEnabled} onClick={handleSubmit} />
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

export default CambioDomicilio;
