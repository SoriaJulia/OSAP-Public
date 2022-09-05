import Button from 'components/Base/Button';
import Field from 'components/Base/Field';
import PageTitle from 'components/Base/PageTitle';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { changeFileInput, changeNumberInput, changeTextArea, changeTextInput } from '@lib/utils';
import React, { useRef, useState } from 'react';
import { getSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { CurrencyCircleDollar, PaperPlaneRight, SpinnerGap } from 'phosphor-react';
import { SERVER_ERROR } from '@lib/constants';
import { useMutation } from 'react-query';
import axios from 'axios';
import { NEXT_URL } from 'config';
import TextArea from '@components/Base/TextArea';

const InformarPago: NextPage<{ agentId: string }> = ({ agentId }) => {
  const [facturas, setFacturas] = useState('');
  const [importe, setImporte] = useState<number | ''>('');
  const [comprobante, setComprobante] = useState<File[]>([]);
  const [comentario, setComentario] = useState('');
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const { isLoading, mutate } = useMutation(
    (data: FormData) => {
      return axios.post(`${NEXT_URL}/afiliado/${agentId}/factura/informarPago`, data);
    },
    {
      onSuccess: ({ data }) => {
        if (data.error) {
          toast.error(data.error, { position: 'bottom-right', duration: 6000 });
          return;
        }
        toast.success('¡Gracias por enviarnos tu pago! En unos dias lo veras reflejado en tus facturas.', {
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
        setFacturas('');
        setImporte('');
        setComentario('');
        setComprobante([]);
        if (inputFileRef.current) inputFileRef.current.value = '';
      },
    }
  );

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formdata = new FormData();
    if (comprobante) formdata.append('comprobante', comprobante[0]);
    formdata.append('facturas', facturas);
    if (importe) formdata.append('importe', importe.toString());
    formdata.append('comentario', comentario);
    mutate(formdata);
  };

  return (
    <div className="mt-4 flex flex-col items-center text-left ">
      <Head>
        <title>Informar Pago - OSAP</title>
      </Head>

      <form className="flex flex-col gap-6 lg:w-8/12">
        <div>
          <PageTitle title="Informar pago de facturas" icon={<CurrencyCircleDollar weight="light" />} />
          <p className="mb-2 text-xl text-blue-600">¿Cómo funciona?</p>
          <ol className="list-inside list-decimal">
            <li>Completa y enviá el formulario</li>
            <li>Durante los próximos días hábiles lo revisamos</li>
            <li>Si el pago es correcto actualizamos el estado de tus facturas</li>
          </ol>
          <p className="mt-4 text-sm">
            *El número de factura podés encontrarlo en{' '}
            <a className="text-teal-600 underline" href="/afiliados/facturacion">
              Pagos y facturación
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded bg-white p-6">
          <div className="-mt-2 flex flex-wrap gap-6 lg:gap-16 ">
            <Field
              label="Factura/s"
              helpText="Números de facturas correspondientes al pago, separados por una coma (,)"
              placeholder="1-45455, 1-302545"
              onChange={changeTextInput(setFacturas)}
              value={facturas}
              inputWidth="w-full"
              className="w-7/12"
              required
            />
            <Field
              label="Importe"
              helpText="Importe depositado o transferido"
              placeholder="12000"
              type="number"
              onChange={changeNumberInput(setImporte)}
              value={importe}
              inputWidth="w-full"
              className="w-3/12"
              required
            />
          </div>
          <TextArea
            onChange={changeTextArea(setComentario)}
            value={comentario}
            label="Mensaje"
            inputWidth="w-11/12"
            helpText="Si lo necesitas podés dejarnos un comentario sobre el pago"
          />
          <Field
            label="Comprobante"
            type="file"
            accept="image/*,.pdf"
            onChange={changeFileInput(setComprobante)}
            ref={inputFileRef}
            helpText="Imagen o .pdf del comprobante de deposito o transferencia"
            inputWidth="w-11/12"
            required
          />
          <Button
            className="self-end"
            label={isLoading ? `Enviando...` : 'Enviar'}
            trailingIcon={
              isLoading ? <SpinnerGap className="animate-spin" weight="bold" size={24} /> : <PaperPlaneRight />
            }
            type="submit"
            onClick={handleSubmit}
            disabled={!facturas || !importe || !comprobante[0]}
            showIconOnMobile
          />
        </div>
      </form>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session || session.status === 'unauthenicated') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const agentId = session.user?.agentId;

  return {
    props: { agentId },
  };
};

export default InformarPago;
