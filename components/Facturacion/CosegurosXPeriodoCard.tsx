import { formatPeriodo } from '@lib/facturacion';
import React from 'react';
import { Coseguro } from '../../types/coseguro';
import CoseguroItem from './CoseguroItem';

type Props = {
  coseguros: Coseguro[];
  isLoading: boolean;
};

const CosegurosXPeriodoCard = ({ coseguros, isLoading }: Props) => {
  if (isLoading) {
    return <div> show coseguro card skeleton</div>;
  }
  return (
    <div className="card flex w-full flex-col gap-2 text-left print:w-full lg:w-[48%]">
      <h3 className="font-display text-2xl tracking-wide text-blue-600">
        Periodo: {formatPeriodo(coseguros[0].periodo)}
      </h3>
      <div className="divide-y-2">
        {coseguros.map((coseguro: Coseguro) => {
          return <CoseguroItem coseguro={coseguro} key={coseguro.concepto} />;
        })}
      </div>
    </div>
  );
};

export default CosegurosXPeriodoCard;
