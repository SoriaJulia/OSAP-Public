import { getFilteredCosegurosXPeriodo } from '@lib/facturacion';
import { useRouter } from 'next/router';
import React from 'react';
import { Coseguro } from '../../types/coseguro';
import Button from '../Base/Button';
import CosegurosXPeriodoCard from './CosegurosXPeriodoCard';

const UltimosCoseguros: React.FC<{ coseguros: Array<Coseguro> }> = ({ coseguros }) => {
  const router = useRouter();
  const cosegurosXPeriodo = getFilteredCosegurosXPeriodo(coseguros);
  return (
    <article className="flex w-full flex-col overflow-x-auto bg-white py-4 px-6 text-left md:m-2 lg:my-2">
      <div className="mb-4 flex  gap-4 sm:justify-between ">
        <h4 className=" text-lg text-orange-600">Ultimos Coseguros</h4>
        <Button label="Ver todos" variant="blueText" onClick={() => router.push('/afiliados/facturacion')} />
      </div>
      <div className="flex flex-wrap gap-3">
        {Object.values(cosegurosXPeriodo)
          .reverse()
          .map((coseg) => {
            return <CosegurosXPeriodoCard key={coseg[0].Periodo} coseguros={coseg} />;
          })}
      </div>
    </article>
  );
};

export default UltimosCoseguros;
