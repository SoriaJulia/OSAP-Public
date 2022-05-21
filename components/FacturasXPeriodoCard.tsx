import { DownloadSimple } from 'phosphor-react';
import React from 'react';
import { Color, State } from '../types/enums/facturas';
import { Factura } from '../types/facturas';

const formatPeriodo = (periodo: string) => {
  return `${periodo.slice(4)}-${periodo.slice(0, 4)}`;
};

const FacturasXPeriodo: React.FC<{ facturas: Factura[] }> = ({ facturas }) => {
  return (
    <div
      key={facturas[0].comp_peri}
      className="flex w-96 flex-col gap-2 rounded py-2 px-3 text-left ring-1 ring-orange-100/50 ring-offset-2 ring-offset-yellow-50/80"
    >
      <h3 className="text-xl text-blue-600">Periodo: {formatPeriodo(facturas[0].comp_peri)}</h3>
      <span className="text-lg text-gray-600">
        Vencimiento: {new Date(facturas[0].comp_fecven).toLocaleDateString()}
      </span>
      <div>
        {facturas.map((factura: Factura) => {
          return (
            <div className="mr-4 grid grid-cols-facturas items-center gap-1" key={factura.comp_id}>
              <span>Nº {`${factura.comp_suc} ${factura.comp_nro}`}</span>
              <span className={`${Color[factura.estado]}`}>{State[factura.estado]}</span>
              <span className="text-right">$ {factura.comp_total}</span>

              <DownloadSimple
                className="cursor-pointer rounded-full p-1 text-blue-400 transition hover:bg-gray-100 hover:text-blue-500 lg:ml-1"
                size={28}
                onClick={() => {
                  console.log('todo: descarga pdf');
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FacturasXPeriodo;
