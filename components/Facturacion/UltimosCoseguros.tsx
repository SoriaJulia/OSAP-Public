import { getFilteredCosegurosXPeriodo } from '@lib/facturacion';
import useCoseguros from 'hooks/coseguros/useCoseguros';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../Base/Button';
import CosegurosList from './CosegurosList';

type Props = {
  agentId: string;
};

const UltimosCoseguros = ({ agentId }: Props) => {
  const router = useRouter();
  const { coseguros, isLoading } = useCoseguros(agentId);
  const cosegurosXPeriodo = getFilteredCosegurosXPeriodo(coseguros);
  return (
    <article className="flex w-full flex-col overflow-x-auto bg-white px-6 py-4 text-left md:m-2 lg:my-2">
      <div className="mb-4 flex  gap-4 sm:justify-between ">
        <h4 className=" text-xl text-orange-700">Ultimos Coseguros</h4>
        <Button label="Ver todos" variant="blueText" onClick={() => router.push('/afiliados/facturacion')} />
      </div>
      <CosegurosList isLoading={isLoading} periodos={cosegurosXPeriodo} periodosToShow={2} />
    </article>
  );
};

export default UltimosCoseguros;
