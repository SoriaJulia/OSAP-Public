import { CosegXPeriodo } from '@appTypes/coseguro';
import CardSkeleton from '@components/Base/CardSkeleton';
import EmptyListMessage from '@components/Base/EmptyListMessage';
import { isEmpty } from 'lodash';
import React from 'react';
import CosegurosXPeriodoCard from './CosegurosXPeriodoCard';

type Props = {
  periodos: CosegXPeriodo;
  periodosToShow?: number;
  isLoading: boolean;
};

const CosegurosList = ({ periodos, periodosToShow, isLoading }: Props) => {
  const skeletonsToShow = periodosToShow || 4;
  const skeletonsList = [];
  for (let index = 0; index < skeletonsToShow; index += 1) {
    skeletonsList.push(<CardSkeleton key={index} />);
  }
  if (isLoading) return <div className="flex flex-wrap gap-3">{skeletonsList}</div>;
  return (
    <div className="flex flex-wrap gap-4">
      {!isEmpty(periodos) ? (
        Object.entries(periodos)
          .map(([periodoId, coseguros]) => {
            return <CosegurosXPeriodoCard key={periodoId} coseguros={coseguros} />;
          })
          .reverse()
          .slice(0, periodosToShow)
      ) : (
        <EmptyListMessage text="No se encontraron Coseguros..." />
      )}
    </div>
  );
};

export default CosegurosList;
