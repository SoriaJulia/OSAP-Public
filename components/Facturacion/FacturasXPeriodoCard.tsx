import { downloadBase64File } from '@lib/utils';
import axios from 'axios';
import { NEXT_URL } from 'config';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Factura } from '../../types/factura';
import { FacturasItem } from './FacturasItem';

const formatPeriodo = (periodo: string) => {
  return `${periodo.slice(4)}-${periodo.slice(0, 4)}`;
};

type Props = { facturas: Factura[]; periodo: string };

const FacturasXPeriodo = ({ facturas, periodo }: Props) => {
  const { data: session } = useSession();
  const agentId = session?.user?.agentId || '';

  const { mutate } = useMutation((compId: number) => {
    return axios.post(`${NEXT_URL}/afiliado/${agentId}/factura/${compId}`);
  });

  const handleDownloadFactura = (compId: number) => {
    mutate(compId, {
      onSuccess: ({ data }) => {
        const name = `Factura-${compId}-OSAP.pdf`;
        downloadBase64File('application/pdf', data.file, name);
      },
    });
  };

  return (
    <div className="card flex w-96 flex-col gap-2 text-left">
      <h3 className="font-display text-xl font-semibold tracking-wide text-blue-600">
        Periodo: <span className="font-2xl">{formatPeriodo(periodo)}</span>
      </h3>
      <span className="text-lg text-gray-600">Vencimiento: {new Date(facturas[0].FecVen).toLocaleDateString()}</span>
      <div>
        {facturas.map((factura: Factura) => (
          <FacturasItem downloadFactura={handleDownloadFactura} factura={factura} key={factura.CompId} />
        ))}
      </div>
    </div>
  );
};

export default FacturasXPeriodo;
