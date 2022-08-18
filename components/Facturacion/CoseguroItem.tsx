import { capitalizeText } from '@lib/utils';
import _ from 'lodash';
import { CaretDown, CaretUp } from 'phosphor-react';
import React, { useState } from 'react';
import { Coseguro } from '../../types/coseguro';

type CoseguroItemProps = {
  coseguro: Coseguro;
};

const CoseguroItem: React.FC<CoseguroItemProps> = ({ coseguro }) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="group flex w-full flex-col gap-3 py-3 hover:bg-slate-50">
      <button
        onClick={() => {
          setShowDetail(!showDetail);
        }}
        className="mr-4 ml-1 grid grid-cols-coseguros items-center gap-1 text-left print:grid-cols-coseguros-print"
      >
        <span className="text-lg text-blue-600">Día: {new Date(coseguro.fecha).getDate()}</span>
        <span>{_.capitalize(coseguro.detalle)}</span>
        <span className="mr-1 text-right text-lg text-teal-500 print:text-xl">$ {coseguro.importe}</span>
        {showDetail ? <CaretUp className="print:hidden" /> : <CaretDown className="print:hidden" />}
      </button>
      <div
        className={`ml-2 flex-col gap-2 print:ml-0 print:flex print:opacity-100 ${
          showDetail ? 'flex opacity-100' : 'hidden bg-white opacity-0 transition-opacity duration-700'
        }`}
      >
        <span>
          <span className="text-orange-800">Concepto:</span> {_.capitalize(coseguro.concepto)}
        </span>
        <span>
          <span className="text-orange-800">Prestador:</span> {capitalizeText(coseguro.prestador)}
        </span>
      </div>
    </div>
  );
};

export default CoseguroItem;
