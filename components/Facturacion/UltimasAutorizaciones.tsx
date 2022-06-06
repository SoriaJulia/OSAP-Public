import Button from 'components/Base/Button';
import React from 'react';
import { useRouter } from 'next/router';
import { Autorizacion } from '@appTypes/autorizacion';
import { getFilteredAutorizacionesXPeriodo } from '@lib/facturacion';
import AutorizacionesList from './AutorizacionesList';

const UltimasAutorizaciones: React.FC<{ autorizaciones: Array<Autorizacion> }> = ({ autorizaciones }) => {
  const router = useRouter();
  const autorizacionesPorPeriodo = getFilteredAutorizacionesXPeriodo(autorizaciones);
  return (
    <article className="flex w-full flex-col overflow-x-auto bg-white py-4 px-6 text-left md:m-2 lg:my-2">
      <div className="mb-4 flex  gap-4 sm:justify-between ">
        <h4 className=" text-lg text-orange-600">Ultimas Autorizaciones</h4>
        <Button label="Ver todas" variant="blueText" onClick={() => router.push('/afiliados/facturacion')} />
      </div>
      <AutorizacionesList periodos={autorizacionesPorPeriodo} periodosToShow={2} />
    </article>
  );
};

export default UltimasAutorizaciones;
