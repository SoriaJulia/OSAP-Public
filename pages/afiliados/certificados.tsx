import User from '@appTypes/user';
import Button from '@components/Base/Button';
import axios from 'axios';
import InputField from '@components/Base/Fields/Input';
import SelectField from '@components/Base/Fields/Select';
import TextAreaField from '@components/Base/Fields/TextArea';
import PageTitle from '@components/Base/PageTitle';
import { capitalizeText, changeFileInput, changeTextArea, defaultQueryOptions, queryService } from '@lib/utils';
import { getCredencialesGrupo } from '@services/agente';
import { NEXT_URL } from 'config';
import useCredenciales, { GET_CREDENCIALES_QUERY_KEY } from 'hooks/credenciales/useCredenciales';
import { GetServerSideProps, NextPage } from 'next';
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from 'pages/api/auth/[...nextauth]';
import { PaperPlaneRight, SpinnerGap } from 'phosphor-react';
import React, { useRef, useState } from 'react';
import { dehydrate, QueryClient, useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { SERVER_ERROR } from '@lib/constants';

const Certificados: NextPage<{ user: User }> = ({ user }) => {
  const { credenciales, isLoading: isLoadingCredenciales } = useCredenciales(user.agentId);
  const [dni, setDNI] = useState(credenciales[0].Documento);
  const [certificado, setCertificado] = useState<File[]>([]);
  const [mensaje, setMensaje] = useState('');
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
    mutate(formdata);
  };

  return (
    <div>
      <PageTitle
        title="Certificado de estudio"
        subtitle="Extendé la cobertura de un integrante de tu familia hasta el dia que cumpla 26 años"
      />
      <form className="flex flex-col gap-4 rounded bg-white/50 p-8 shadow-sm lg:mr-80 lg:px-12">
        <SelectField
          id="Afiliado"
          onChange={(e) => setDNI(e.target.value)}
          value={dni}
          helpText="Seleccioná el afiliado al que corresponde el certificado"
          label="Afiliado"
          required
        >
          {isLoadingCredenciales ? (
            <option>Cargando...</option>
          ) : (
            credenciales.map((credencial) => (
              <option value={credencial.Documento} key={credencial.Documento}>
                {capitalizeText(credencial.Afiliado)}
              </option>
            ))
          )}
        </SelectField>
        <InputField
          id="Certificado"
          label="Certificado de Estudio"
          type="file"
          accept="image/*,.pdf"
          onChange={changeFileInput(setCertificado)}
          ref={inputFileRef}
          helpText="Imagen o .pdf del certificado"
          required
        />
        <TextAreaField
          id="Mensaje"
          label="Mensaje"
          onChange={changeTextArea(setMensaje)}
          value={mensaje}
          placeholder="¿Necesitas aclarandos algo? dejanos tu mensaje acá"
        />
        <div className="mt-2 flex w-full justify-end md:pr-10">
          <Button
            label={isLoading ? `Enviando...` : 'Enviar'}
            trailingIcon={
              isLoading ? <SpinnerGap className="animate-spin" weight="bold" size={24} /> : <PaperPlaneRight />
            }
            type="submit"
            onClick={handleSubmit}
            disabled={!certificado[0]}
            showIconOnMobile
          />
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (!session || session.status === 'unauthenicated' || !session.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { agentId } = session.user;

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
