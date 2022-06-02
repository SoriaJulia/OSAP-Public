import { Credencial } from '@appTypes/credencial';
import React, { useState } from 'react';
import Button from '../Base/Button';
import Portal from '../Layout/Portal';
import CredencialModal from './Modal';

type CredencialProps = {
  credencial: Credencial;
  agentId: string;
};

const Credencial: React.FC<CredencialProps> = ({ credencial, agentId }) => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => () => {
    setShowModal(true);
  };
  return (
    <div>
      <div
        role="button"
        onClick={handleClick()}
        onKeyDown={handleClick()}
        tabIndex={0}
        className="flex w-80 flex-col rounded-xl bg-gradient-to-br from-orange-600 to-orange-200/90 drop-shadow  transition ease-in-out hover:scale-105 sm:w-96 "
      >
        <div className=" mt-1 flex flex-wrap justify-between border-b-2 border-white px-4 text-left">
          <div className="w-11/12">
            <p className="mb-2.5 rounded-sm pt-2 text-xl font-medium text-slate-50">{credencial.Afiliado}</p>
          </div>
          <div className="w-3/5">
            <p className="font-bold text-grey-800">Convenio</p>
            <p className="mb-2.5 rounded-sm bg-slate-50/50 pl-1">{credencial.Convenio}</p>
          </div>
          <div className="w-2/6">
            <p className="font-bold text-grey-800">Numero</p>
            <p className="mb-2.5 rounded-sm bg-slate-50/50 pl-1">{credencial.Numero}</p>
          </div>
          <div className="w-3/5">
            <p className="font-bold text-grey-800">Documento</p>
            <p className="mb-2.5 rounded-sm bg-slate-50/50 pl-1">
              {credencial.TipoDoc} {credencial.Documento}
            </p>
          </div>
          <div className="w-2/6">
            <p className="font-bold text-grey-800">Agente</p>
            <p className="mb-2.5 rounded-sm bg-slate-50/50 pl-1">{agentId}</p>
          </div>
        </div>
        <div className="mb-1 flex justify-end">
          <Button label="Ver Credencial" variant="slateText" onClick={handleClick()} />
        </div>
      </div>
      <Portal>
        <CredencialModal
          show={showModal}
          onDismiss={() => {
            setShowModal(false);
          }}
          title="Credencial"
          credencial={credencial}
          agentId={agentId}
        />
      </Portal>
    </div>
  );
};

export default Credencial;
