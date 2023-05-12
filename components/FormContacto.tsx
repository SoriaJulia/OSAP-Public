import { SERVER_ERROR } from '@lib/constants';
import { changeTextInput, changeTextArea } from '@lib/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { NEXT_URL } from 'config';
import { SpinnerGap, PaperPlaneRight } from 'phosphor-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from './Base/Button';
import InputField from './Base/Fields/Input';
import SelectField from './Base/Fields/Select';
import TextAreaField from './Base/Fields/TextArea';

const FormContacto = ({ showTitle, showBg }: { showTitle?: boolean; showBg?: boolean }) => {
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
    <form className={`${showBg ? 'bg-white/50 shadow-sm' : ''} flex flex-wrap gap-4 rounded p-8`}>
      {showTitle && <h2 className="mb-2 w-full text-left text-2xl text-blue-700">Dejanos tu mensaje</h2>}
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
  );
};

export default FormContacto;
