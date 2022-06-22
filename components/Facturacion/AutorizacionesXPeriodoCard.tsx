import { Autorizacion } from '@appTypes/autorizacion';
import { formatPeriodo } from '@lib/facturacion';
import React from 'react';
import AutorizacionItem from './AutorizacionItem';

const AutorizacionesXPeriodoCard: React.FC<{ autorizaciones: Autorizacion[]; periodo: string }> = ({
  autorizaciones,
  periodo,
}) => {
  return (
    <div className="flex flex-col gap-2 rounded py-2 px-3 text-left ring-1 ring-orange-100/50 ring-offset-2 ring-offset-yellow-50/80 sm:w-[48%]">
      <h3 className="font-display text-xl font-semibold tracking-wide text-blue-600">
        Periodo: <span className="font-2xl">{formatPeriodo(periodo)}</span>
      </h3>
      <div>
        {autorizaciones.map((autorizacion: Autorizacion) => {
          return <AutorizacionItem autorizacion={autorizacion} key={autorizacion.nro_ord} />;
        })}
      </div>
    </div>
  );
};

export default AutorizacionesXPeriodoCard;
