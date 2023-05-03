import { State } from '@appTypes/enums/facturas';
import { Factura } from '@appTypes/factura';
import classNames from 'classnames';
import { DownloadSimple } from 'phosphor-react';

type Props = {
  factura: Factura;
  downloadFactura: (compId: number) => void;
};
export const FacturasItem = ({ factura, downloadFactura }: Props) => {
  const { CompId, Estado, Suc, Nro, Total } = factura;

  return (
    <div className="mr-4 mt-1 grid grid-cols-facturas items-center gap-1">
      <span className="font-display">Nº {`${Suc}-${Nro}`}</span>
      <span
        className={classNames({ 'pill-success': Estado === 'N' || Estado === 'C', 'pill-warning': Estado === 'E' })}
      >
        {State[Estado]}
      </span>
      <span className="text-right font-semibold text-gray-600">$ {Total}</span>

      <DownloadSimple
        className="mr-1 cursor-pointer rounded-full p-1 text-blue-400 transition hover:bg-gray-100 hover:text-blue-500 lg:ml-1"
        size={28}
        alt="Descargar factura"
        onClick={() => {
          downloadFactura(CompId);
        }}
      />
    </div>
  );
};
