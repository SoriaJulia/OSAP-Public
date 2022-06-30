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
        className="mr-4 ml-1 grid grid-cols-coseguros items-center gap-1 text-left "
      >
        {/* <span className="text-lg">Fecha: {new Date(coseguro.Fecha).toLocaleDateString()}</span> */}
        <span>{_.capitalize(coseguro.detalle)}</span>
        <span className="mr-1  text-lg text-teal-500">$ {coseguro.importe}</span>
        {showDetail ? <CaretUp /> : <CaretDown />}
      </button>
      <div
        className={`ml-2 mt-1 flex-col gap-1 ${
          showDetail ? 'flex opacity-100' : 'hidden bg-white opacity-0 transition-opacity duration-700'
        }`}
      >
        <span>
          <span className="text-lg text-orange-800">Concepto:</span> {_.capitalize(coseguro.concepto)}
        </span>
        <span>
          <span className="text-lg text-orange-800">Prestador:</span> {_.capitalize(coseguro.prestador)}
        </span>
      </div>
    </div>
  );
};

export default CoseguroItem;
