import _ from 'lodash';
import Router from 'next/router';
import React from 'react';
import { Factura } from '../../types/factura';
import Button from '../Base/Button';
import FacturasXPeriodo from './FacturasXPeriodoCard';

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
];
const facturasPorPeriodo = _.groupBy<Factura>(facturasWS, (factura) => factura.comp_peri);
const UltimasFacturas = () => {
  return (
    <article className="flex w-full flex-col overflow-x-scroll bg-white py-4 px-6 text-left md:m-2 lg:my-2">
      <div className="mb-4 flex  gap-4 sm:justify-between ">
        <h4 className=" text-lg text-orange-600">Ultimas Facturas</h4>
        <Button label="Ver todas" variant="blueText" onClick={() => Router.push('/afiliados/facturacion')} />
      </div>
      <div className="flex gap-4">
        {Object.values(facturasPorPeriodo)
          .reverse()
          .map((facturas) => {
            return <FacturasXPeriodo key={facturas[0].comp_peri} facturas={facturas} />;
          })}
      </div>
    </article>
  );
};

export default UltimasFacturas;
