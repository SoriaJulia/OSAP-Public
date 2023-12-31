import { Autorizacion } from '@appTypes/autorizacion';
import { State } from '@appTypes/enums/autorizaciones';
import { capitalizeText } from '@lib/utils';
import classNames from 'classnames';
import _ from 'lodash';
import { CaretDown, CaretUp } from 'phosphor-react';
import React, { useState } from 'react';

type Props = { autorizacion: Autorizacion };

const AutorizacionItem = ({ autorizacion }: Props) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="group flex w-full flex-col gap-1 py-3 hover:bg-slate-50">
      <button
        onClick={() => {
          setShowDetail(!showDetail);
        }}
        className="ml-1 mr-4 grid grid-cols-autorizaciones gap-1 text-left "
        key={autorizacion.nro_ord}
      >
        <span>Día: {new Date(autorizacion.fecha).getDate()}</span>
        <span>{_.capitalize(autorizacion.ori_nom)}</span>
        <span
          className={classNames({
            'pill-success': true,
            'pill-warning': autorizacion.aut_estado === 'P' || autorizacion.aut_estado === 'T',
            'pill-error': autorizacion.aut_estado === 'R' || autorizacion.aut_estado === 'U',
          })}
        >
          {State[autorizacion.aut_estado]}
        </span>
        {showDetail ? <CaretUp /> : <CaretDown />}
      </button>
      <div
        className={`ml-2 mt-1 flex-col gap-1 ${
          showDetail ? 'flex opacity-100' : 'hidden bg-white opacity-0 transition-opacity duration-700'
        }`}
      >
        <span>
          <span className="text-lg text-orange-800">Afiliado:</span> {capitalizeText(autorizacion.Afiliado)}
        </span>
        <span>
          <span className="text-orange-800">Orden Nº:</span> {autorizacion.nro_ord}
        </span>
      </div>
    </div>
  );
};

export default AutorizacionItem;
