import { AutXPeriodo } from '@appTypes/autorizacion';
import CardSkeleton from '@components/Base/CardSkeleton';
import EmptyListMessage from '@components/Base/EmptyListMessage';
import { isEmpty } from 'lodash';
import React from 'react';
import AutorizacionesXPeriodoCard from './AutorizacionesXPeriodoCard';

type Props = {
  periodos: AutXPeriodo;
  periodosToShow?: number;
  isLoading: boolean;
};

const AutorizacionesList = ({ periodos, periodosToShow, isLoading }: Props) => {
  const skeletonsToShow = periodosToShow || 4;
  const skeletonsList = [];
  for (let index = 0; index < skeletonsToShow; index += 1) {
    skeletonsList.push(<CardSkeleton key={index} />);
  }
  if (isLoading) return <div className="flex flex-wrap gap-3">{skeletonsList}</div>;

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
        <EmptyListMessage text="No se encontraron Autorizaciones..." />
      )}
    </div>
  );
};

export default AutorizacionesList;
