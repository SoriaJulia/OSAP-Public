import { getFilteredFacturasXPeriodo } from '@lib/facturacion';
import useFacturas from 'hooks/facturas/useFacturas';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../Base/Button';
import FacturasList from './FacturasList';

type Props = {
  agentId: string;
};

const UltimasFacturas = ({ agentId }: Props) => {
  const router = useRouter();
  const { facturas, isLoading } = useFacturas(agentId);
  const facturasPorPeriodo = getFilteredFacturasXPeriodo(facturas);
  return (
    <article className="flex w-full flex-col overflow-x-auto bg-white px-6 py-4 text-left md:m-2 lg:my-2">
      <div className="mb-4 flex  gap-4 sm:justify-between ">
        <h4 className=" text-xl text-orange-700">Ultimas Facturas</h4>
        <Button label="Ver todas" variant="blueText" onClick={() => router.push('/afiliados/facturacion')} />
      </div>
      <FacturasList isLoading={isLoading} periodos={facturasPorPeriodo} periodosToShow={3} />
    </article>
  );
};

export default UltimasFacturas;
