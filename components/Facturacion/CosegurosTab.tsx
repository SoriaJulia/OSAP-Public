import { getFilteredCosegurosXPeriodo } from '@lib/facturacion';
import { changeNumberInput, currentYear } from '@lib/utils';
import useCoseguros from 'hooks/coseguros/useCoseguros';
import { isEmpty } from 'lodash';
import { Info } from 'phosphor-react';
import React, { useState } from 'react';
import Field from '../Base/Field';
import CosegurosXPeriodoCard from './CosegurosXPeriodoCard';

type Props = {
  agentId: string;
};

const CosegurosTab = ({ agentId }: Props) => {
  const [selectedYear, setSelectedYear] = useState<number | ''>(currentYear);
  const { coseguros, isLoading } = useCoseguros(agentId);
  const cosegurosXPeriodo = getFilteredCosegurosXPeriodo(coseguros, selectedYear);
  return (
    <div>
      <div className="my-2 flex flex-wrap items-center justify-end gap-4">
        <Field
          label="Año"
          type="number"
          labelPosition="left"
          value={selectedYear}
          onChange={changeNumberInput(setSelectedYear)}
          max={currentYear}
        />
      </div>
      <div className="flex flex-wrap gap-5 pt-5">
        {!isEmpty(cosegurosXPeriodo) ? (
          Object.values(cosegurosXPeriodo)
            .reverse()
            .map((coseg) => {
              return <CosegurosXPeriodoCard isLoading={isLoading} key={coseg[0].periodo} coseguros={coseg} />;
            })
        ) : (
          <div className="mb-3 mt-1 flex grow items-center justify-center gap-1 text-xl text-teal-700">
            <Info size={24} weight="fill" />
            No se encontraron coseguros...
          </div>
        )}
      </div>
    </div>
  );
};

export default CosegurosTab;
