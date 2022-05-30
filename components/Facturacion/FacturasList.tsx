import { Periodo } from '@appTypes/factura';
import { isEmpty } from 'lodash';
import { Info } from 'phosphor-react';
import React from 'react';
import FacturasXPeriodo from './FacturasXPeriodoCard';

const FacturasList = ({ periodos, periodosToShow: quantity }: { periodos: Periodo; periodosToShow?: number }) => {
  return (
    <div className="flex flex-wrap gap-5 pt-5">
      {!isEmpty(periodos) ? (
        Object.entries(periodos)
          .map(([periodoId, facturas]) => {
            return <FacturasXPeriodo key={periodoId} facturas={facturas} periodo={periodoId} />;
          })
          .reverse()
          .slice(0, quantity)
      ) : (
        <div className="mb-3 mt-1 flex grow items-center justify-center gap-1 text-xl text-teal-700">
          <Info size={24} weight="fill" />
          No se encontraron facturas...
        </div>
      )}
    </div>
  );
};

export default FacturasList;
