import _ from 'lodash';
import Router from 'next/router';
import React from 'react';
import { Factura } from '../../types/factura';
import Button from '../Base/Button';
import FacturasXPeriodo from './FacturasXPeriodoCard';

type UltimasFacturasProps = {
  facturas: Array<Factura>;
};

const UltimasFacturas: React.FC<UltimasFacturasProps> = ({ facturas }) => {
  const facturasPorPeriodo = _.groupBy<Factura>(facturas, (factura) =>
    factura.comp_peri ? factura.comp_peri : '202220'
  );
  return (
    <article className="flex w-full flex-col overflow-x-scroll bg-white py-4 px-6 text-left md:m-2 lg:my-2">
      <div className="mb-4 flex  gap-4 sm:justify-between ">
        <h4 className=" text-lg text-orange-600">Ultimas Facturas</h4>
        <Button label="Ver todas" variant="blueText" onClick={() => Router.push('/afiliados/facturacion')} />
      </div>
      <div className="flex gap-4">
        {Object.values(facturasPorPeriodo)
          .reverse()
          .map((facs) => {
            return <FacturasXPeriodo key={facs[0].comp_peri} facturas={facs} />;
          })}
      </div>
    </article>
  );
};

export default UltimasFacturas;
