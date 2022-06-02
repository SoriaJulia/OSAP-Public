import { Credencial } from '@appTypes/credencial';
import Modal, { ModalProps } from 'components/Base/Modal';
import Logo from 'components/SVG/Logo';
import Slogan from 'components/SVG/Slogan';
import React from 'react';

type CredencialProps = {
  credencial: Credencial;
  agentId: string;
};

const CredencialModal: React.FC<CredencialProps & ModalProps> = ({ onDismiss, show, credencial, agentId }) => {
  return (
    <Modal onDismiss={onDismiss} show={show} variant="dark">
      <div className="m-6 flex w-[650px] flex-col rounded-xl bg-orange-550/90 drop-shadow-lg ">
        <div className="ml-6 mb-1 mt-5 flex  items-end">
          <Logo className="h-16 fill-slate-50" /> <Slogan width="160" height="45" className="fill-slate-50" />
        </div>
        <p className="my-2 border-b-4 border-slate-100 pb-1 pl-6 text-left font-bold text-gray-300">
          Obra social del Personal de TERNIUM Argentina
        </p>
        <div className="mb-5 mt-1 flex flex-wrap justify-between border-b-2 border-slate-100 px-6 pb-2 text-left">
          <div className="w-2/3">
            <p className="font-bold text-grey-800">CONVENIO</p>
            <p className="mb-2.5 rounded-sm bg-slate-50/70 pl-1">{credencial.Convenio}</p>
          </div>
          <div className="w-1/4">
            <p className="font-bold text-grey-800">NUMERO</p>
            <p className="mb-2.5 rounded-sm bg-slate-50/70 pl-1">{credencial.Numero}</p>
          </div>
          <div className="w-full">
            <p className="font-bold text-grey-800">APELLIDO Y NOMBRES</p>
            <p className="mb-2.5 rounded-sm bg-slate-50/70 pl-1">{credencial.Afiliado}</p>
          </div>
          <div className="w-2/3">
            <p className="font-bold text-grey-800">DOCUMENTO</p>
            <p className="mb-2.5 rounded-sm bg-slate-50/70 pl-1">
              {credencial.TipoDoc} {credencial.Documento}
            </p>
          </div>
          <div className="w-1/4">
            <p className="font-bold text-grey-800">Agente de Cuenta</p>
            <p className="mb-2.5 rounded-sm bg-slate-50/70 pl-1">{agentId}</p>
          </div>
          <div className="w-2/3">
            <p className="font-bold text-grey-800">C.P.</p>
            <p className="mb-2.5 rounded-sm bg-slate-50/70 pl-1">{credencial.CP}</p>
          </div>
          <div className="w-1/4">
            <p className="font-bold text-grey-800">I.V.A.</p>
            <p className="mb-2.5 rounded-sm bg-slate-50/70 pl-1">{credencial.IVA}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CredencialModal;
