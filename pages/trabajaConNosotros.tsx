import Button from '@components/Base/Button';
import InputField from '@components/Base/Fields/Input';
import RadioButton from '@components/Base/Fields/RadioButton';
import RadioGroup from '@components/Base/Fields/RadioGroup';
import TextAreaField from '@components/Base/Fields/TextArea';
import PageTitle from '@components/Base/PageTitle';

import { SERVER_ERROR } from '@lib/constants';
import { changeTextInput, changeTextArea, changeFileInput } from '@lib/utils';
import axios from 'axios';
import { NEXT_URL } from 'config';
import { NextPage } from 'next';
import Head from 'next/head';
import { SpinnerGap, PaperPlaneRight } from 'phosphor-react';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

const TrabajaConNosotros: NextPage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipo, setTipo] = useState('empleado');
  const [archivo, setArchivo] = useState<File[]>([]);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const { isLoading, mutate } = useMutation(
    (data: FormData) => {
      return axios.post(`${NEXT_URL}/trabaja`, data);
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
        setArchivo([]);
        if (inputFileRef.current) inputFileRef.current.value = '';
      },
    }
  );

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('nombre', nombre);
    formdata.append('email', email);
    formdata.append('mensaje', mensaje);
    formdata.append('tipo', tipo);
    if (archivo[0]) formdata.append('archivo', archivo[0]);
    mutate(formdata);
  };
  return (
    <div>
      <Head>
        <title>Trabajá con Nosotros - OSAP</title>
        <meta name="description" content="Sumate a nuestro equipo como empleado o prestador" />
      </Head>
      <PageTitle title="Trabajá con nosotros" />
      <div className="flex flex-wrap items-start">
        <form className="flex flex-col gap-2 rounded bg-white/50 p-8 shadow-sm lg:w-6/12">
          <RadioGroup stateSetter={setTipo} legend="Para que tipo de puesto estas aplicando?" defaultValue="empleado">
            <RadioButton inputWidth="w-auto" label="Empleado" id="empleado" name="tipo" labelPosition="left" />
            <RadioButton inputWidth="w-auto" label="Prestador" id="prestador" name="tipo" labelPosition="left" />
          </RadioGroup>
          <InputField
            label="Nombre y Apellido"
            required
            placeholder="Juan Perez"
            onChange={changeTextInput(setNombre)}
            value={nombre}
            id="NombreYApellido"
          />
          <InputField
            label="Email"
            id="Email"
            type="email"
            required
            placeholder="juan@gmail.com"
            helpText="Nos pondremos en contacto por este medio cuando revisemos tu solicitud."
            onChange={changeTextInput(setEmail)}
            value={email}
          />
          {tipo === 'empleado' ? (
            <InputField
              id="Archivo"
              label="Curriculum Vitae"
              type="file"
              accept="image/*,.pdf"
              onChange={changeFileInput(setArchivo)}
              ref={inputFileRef}
              helpText="Imagen o .pdf de tu cv o Protfolio"
            />
          ) : undefined}
          <TextAreaField
            label="Mensaje"
            inputWidth="w-full"
            className="w-full"
            cols={500}
            rows={5}
            required
            placeholder="Dejanos tu mensaje..."
            onChange={changeTextArea(setMensaje)}
            value={mensaje}
            id="mensaje"
          />
          <div className="mt-2 flex w-full justify-end md:pr-10">
            <Button
              label={isLoading ? `Enviando...` : 'Enviar'}
              trailingIcon={
                isLoading ? <SpinnerGap className="animate-spin" weight="bold" size={24} /> : <PaperPlaneRight />
              }
              type="submit"
              onClick={handleSubmit}
              disabled={!nombre || !email || !mensaje || !tipo || (tipo === 'empleado' && !archivo[0])}
              showIconOnMobile
            />
          </div>
        </form>
        <img src="./img/resume.svg" alt="" className="hidden w-6/12 p-12 pt-0 lg:block" />
      </div>
    </div>
  );
};

export default TrabajaConNosotros;
