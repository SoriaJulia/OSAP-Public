import { FacXPeriodo } from '@appTypes/factura';
import CardSkeleton from '@components/Base/CardSkeleton';
import EmptyListMessage from '@components/Base/EmptyListMessage';
import { isEmpty } from 'lodash';
import React from 'react';
import FacturasXPeriodo from './FacturasXPeriodoCard';

type Props = {
  periodos: FacXPeriodo;
  periodosToShow?: number;
  isLoading: boolean;
};

const FacturasList = ({ periodos, periodosToShow, isLoading }: Props) => {
  const skeletonsToShow = periodosToShow || 6;
  const skeletonsList = [];
  for (let index = 0; index < skeletonsToShow; index += 1) {
    skeletonsList.push(<CardSkeleton width="w-96" key={index} />);
  }
  if (isLoading) return <div className="flex flex-wrap gap-3">{skeletonsList}</div>;

  return (
    <div className="flex flex-wrap gap-5 pt-5">
      {!isEmpty(periodos) ? (
        Object.entries(periodos)
          .map(([periodoId, facturas]) => {
            return <FacturasXPeriodo isLoading={isLoading} key={periodoId} facturas={facturas} periodo={periodoId} />;
          })
          .reverse()
          .slice(0, periodosToShow)
      ) : (
        <EmptyListMessage text="No se encontraron Facturas..." />
      )}
    </div>
  );
};

export default FacturasList;
