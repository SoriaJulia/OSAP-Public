import { Factura } from '@appTypes/factura';
import React from 'react';
import FacturasXPeriodo from './FacturasXPeriodoCard';

const FacturasList = ({ periodos }: { periodos: Factura[][] }) => {
  return (
    <div className="flex flex-wrap gap-5 pt-5">
      {periodos.length >= 0 ? (
        periodos.map((facturas) => {
          return <FacturasXPeriodo key={facturas[0].comp_peri} facturas={facturas} />;
        })
      ) : (
        <div>No se encontraron facturas...</div>
      )}
      ;
    </div>
  );
};

export default FacturasList;
