import { AutXPeriodo } from '@appTypes/autorizacion';
import { isEmpty } from 'lodash';
import { Info } from 'phosphor-react';
import React from 'react';
import AutorizacionesXPeriodoCard from './AutorizacionesXPeriodoCard';

const AutorizacionesList = ({ periodos, periodosToShow }: { periodos: AutXPeriodo; periodosToShow?: number }) => {
  return (
    <div className="flex flex-wrap gap-5 pt-5">
      {!isEmpty(periodos) ? (
        Object.entries(periodos)
          .map(([periodoId, autorizaciones]) => {
            return <AutorizacionesXPeriodoCard key={periodoId} autorizaciones={autorizaciones} periodo={periodoId} />;
          })
          .reverse()
          .slice(0, periodosToShow)
      ) : (
        <div className="mb-3 mt-1 flex grow items-center justify-center gap-1 text-xl text-teal-700">
          <Info size={24} weight="fill" />
          No se encontraron autorizaciónes...
        </div>
      )}
    </div>
  );
};

export default AutorizacionesList;
