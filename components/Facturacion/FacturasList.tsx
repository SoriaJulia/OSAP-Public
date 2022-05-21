import React from 'react';
import _ from 'lodash';
import { MagnifyingGlass } from 'phosphor-react';
import { State } from '../../types/enums/facturas';
import { Factura } from '../../types/factura';
import Field from '../Base/Field';
import Button from '../Base/Button';
import FacturasXPeriodo from './FacturasXPeriodoCard';
import Select from '../Base/Select';

// TODO call ws
const facturasWS: Array<Factura> = [
  {
    comp_id: 1873239,
    comp_peri: '202205',
    comp_suc: 1,
    comp_nro: 43301,
    comp_fecven: '2022-05-25T00:00:00',
    estado: 'E',
    comp_total: 4168.86,
  },
  {
    comp_id: 1872988,
    comp_peri: '202205',
    comp_suc: 1,
    comp_nro: 43283,
    comp_fecven: '2022-05-25T00:00:00',
    estado: 'E',
    comp_total: 1914.01,
  },
  {
    comp_id: 1845133,
    comp_peri: '202204',
    comp_suc: 1,
    comp_nro: 303192,
    comp_fecven: '2022-04-25T00:00:00',
    estado: 'N',
    comp_total: 1614.0,
  },
  {
    comp_id: 1842742,
    comp_peri: '202203',
    comp_suc: 1,
    comp_nro: 42509,
    comp_fecven: '2022-04-25T00:00:00',
    estado: 'N',
    comp_total: 1780.48,
  },
  {
    comp_id: 1829643,
    comp_peri: '202203',
    comp_suc: 1,
    comp_nro: 300715,
    comp_fecven: '2022-03-25T00:00:00',
    estado: 'N',
    comp_total: 2650.0,
  },
  {
    comp_id: 1829643,
    comp_peri: '202202',
    comp_suc: 1,
    comp_nro: 300715,
    comp_fecven: '2022-02-25T00:00:00',
    estado: 'N',
    comp_total: 2650.0,
  },
  {
    comp_id: 1829643,
    comp_peri: '202202',
    comp_suc: 1,
    comp_nro: 300715,
    comp_fecven: '2022-02-25T00:00:00',
    estado: 'N',
    comp_total: 2650.0,
  },
];

const facturasPorPeriodo = _.groupBy<Factura>(facturasWS, (factura) => factura.comp_peri);

const FacturasList = () => {
  return (
    <>
      <div className="my-2 flex flex-wrap items-center justify-end gap-4">
        <Field label="Periodo" type="month" labelPosition="left" />
        <Select label="Estado" labelPosition="left">
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
      <div className="flex flex-wrap gap-5 pt-5">
        {Object.values(facturasPorPeriodo)
          .reverse()
          .map((facturas) => {
            return <FacturasXPeriodo key={facturas[0].comp_peri} facturas={facturas} />;
          })}
      </div>
    </>
  );
};

export default FacturasList;
