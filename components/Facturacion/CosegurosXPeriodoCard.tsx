import React from 'react';
import { Coseguro } from '../../types/coseguro';
import CoseguroItem from './CoseguroItem';

const formatPeriodo = (periodo: string) => {
  return `${periodo.slice(4)}-${periodo.slice(0, 4)}`;
};

const CosegurosXPeriodoCard: React.FC<{ coseguros: Coseguro[] }> = ({ coseguros }) => {
  return (
    <div
      key={coseguros[0].periodo}
      className="flex h-fit w-1/2 flex-col gap-2 rounded py-2 px-3 text-left ring-1 ring-orange-100/50 ring-offset-2 ring-offset-yellow-50/80"
    >
      <h3 className="text-xl text-blue-600">Periodo: {formatPeriodo(coseguros[0].periodo)}</h3>
      <div className="divide-y-2">
        {coseguros.map((coseguro: Coseguro) => {
          return <CoseguroItem coseguro={coseguro} key={coseguro.id} />;
        })}
      </div>
    </div>
  );
};

export default CosegurosXPeriodoCard;
