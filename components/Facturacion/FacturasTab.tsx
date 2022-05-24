import React, { useState } from 'react';
import _ from 'lodash';
import { MagnifyingGlass } from 'phosphor-react';
import { changeNumberInput, changeTextInput } from '@lib/utils';
import { State } from '../../types/enums/facturas';
import { Factura } from '../../types/factura';
import Field from '../Base/Field';
import Button from '../Base/Button';
import Select from '../Base/Select';
import FacturasList from './FacturasList';

const FacturasTab = ({ payload }: { payload: Array<Factura> }) => {
  const facturasPorPeriodo = _.groupBy<Factura>(payload, (factura) => factura.comp_peri);
  const actualYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(actualYear);
  const [selectedState, setSelectedState] = useState('');
  const filteredPeriodos = Object.values(facturasPorPeriodo).filter((facturas) =>
    facturas.filter(
      (factura) => factura.estado.includes(selectedState) && factura.comp_peri.includes(selectedYear.toString())
    )
  );
  return (
    <>
      <div className="my-2 flex flex-wrap items-center justify-end gap-4">
        <Field
          label="Año"
          type="number"
          labelPosition="left"
          value={selectedYear}
          onChange={changeNumberInput(setSelectedYear)}
          min={1990}
          max={actualYear}
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
        <Button
          variant="blueFill"
          label="Buscar"
          className="h-12 text-lg"
          trailingIcon={<MagnifyingGlass weight="bold" />}
        />
      </div>
      <FacturasList periodos={filteredPeriodos} />
    </>
  );
};

export default FacturasTab;
