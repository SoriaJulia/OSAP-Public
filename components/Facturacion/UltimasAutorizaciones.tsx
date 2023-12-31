import Button from 'components/Base/Button';
import React from 'react';
import { useRouter } from 'next/router';
import { getFilteredAutorizacionesXPeriodo } from '@lib/facturacion';
import useAutorizaciones from 'hooks/autorizaciones/useAutorizaciones';
import AutorizacionesList from './AutorizacionesList';

const UltimasAutorizaciones = ({ agentId }: { agentId: string }) => {
  const router = useRouter();
  const { autorizaciones, isLoading } = useAutorizaciones(agentId);

  const autorizacionesPorPeriodo = getFilteredAutorizacionesXPeriodo(autorizaciones);
  return (
    <article className="flex w-full flex-col overflow-x-auto bg-white px-6 py-4 text-left md:m-2 lg:my-2">
      <div className="mb-4 flex  gap-4 sm:justify-between ">
        <h4 className=" text-xl text-orange-700">Ultimas Autorizaciones</h4>
        <Button label="Ver todas" variant="blueText" onClick={() => router.push('/afiliados/facturacion')} />
      </div>
      <AutorizacionesList isLoading={isLoading} periodos={autorizacionesPorPeriodo} periodosToShow={2} />
    </article>
  );
};

export default UltimasAutorizaciones;
