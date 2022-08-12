import { Autorizacion } from '@appTypes/autorizacion';
import { State } from '@appTypes/enums/autorizaciones';
import { getAfiliados, getFilteredAutorizacionesXPeriodo } from '@lib/facturacion';
import { changeNumberInput, currentYear } from '@lib/utils';
import Field from 'components/Base/Field';
import Select from 'components/Base/Select';
import useAutorizaciones from 'hooks/autorizaciones/useAutorizaciones';
import React, { useState } from 'react';
import AutorizacionesList from './AutorizacionesList';

const AutorizacionesTab = ({ agentId }: { agentId: string }) => {
  const [selectedYear, setSelectedYear] = useState<number | ''>(currentYear);
  const [selectedState, setSelectedState] = useState('');
  const [selectedAfiliado, setSelectedAfiliado] = useState('');
  const { autorizaciones, isLoading } = useAutorizaciones(agentId);
  const autorizacionesPorPeriodo = getFilteredAutorizacionesXPeriodo(
    autorizaciones,
    selectedYear,
    selectedAfiliado,
    selectedState
  );
  const afiliados = getAfiliados(autorizaciones);
  return (
    <>
      <div className="my-2 flex flex-wrap items-center justify-end gap-4">
        <Field
          label="Año"
          type="number"
          labelPosition="left"
          value={selectedYear}
          onChange={changeNumberInput(setSelectedYear)}
          max={currentYear}
        />
        <Select
          label="Estado"
          labelPosition="left"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">Todos</option>
          {(Object.keys(State) as (keyof typeof State)[]).map((key) => {
            return (
              <option value={key} key={key}>
                {State[key]}
              </option>
            );
          })}
        </Select>
        <Select
          label="Afiliado"
          labelPosition="left"
          value={selectedAfiliado}
          onChange={(e) => setSelectedAfiliado(e.target.value)}
        >
          <option value="">Todos</option>
          {(Object.keys(afiliados) as (keyof typeof afiliados)[]).map((key) => {
            return (
              <option value={key} key={key}>
                {afiliados[key]}
              </option>
            );
          })}
        </Select>
      </div>
      <AutorizacionesList isLoading={isLoading} periodos={autorizacionesPorPeriodo} />
    </>
  );
};

export default AutorizacionesTab;
