import { Afiliado } from '@appTypes/afiliado';
import Modal from '@components/Base/Modal';
import { capitalizeText, convertToLocaleDateString, getAge } from '@lib/utils';
import { CalendarBlank, GenderFemale, GenderMale, Info, ShieldPlus, UserCircle } from 'phosphor-react';
import React, { useState } from 'react';

const CardAfiliado = ({ afiliado }: { afiliado: Afiliado }) => {
  const FechaNac = convertToLocaleDateString(afiliado.fechanac);
  const InicioCobertura = convertToLocaleDateString(afiliado.InicioCobertura);
  const FinCoberturaEsp = afiliado.cobesp_hasta ? convertToLocaleDateString(afiliado.cobesp_hasta) : '';
  const sexo =
    afiliado.sexo === 'F' ? <GenderFemale size={18} weight="duotone" /> : <GenderMale size={18} weight="duotone" />;
  const [showModal, setShowModal] = useState(true);
  return (
    <Modal
      onDismiss={() => {
        setShowModal(false);
      }}
      show={showModal}
    >
      <div className="flex w-full gap-6 px-8 pt-12 pb-4 text-slate-700">
        <UserCircle size={48} weight="duotone" className="text-yellow-800" />
        <div className="flex flex-col gap-3">
          <p className=" flex items-center gap-1 text-xl text-teal-600">
            {capitalizeText(afiliado.Afiliado)} {sexo}
          </p>
          <div className="flex justify-between gap-4">
            <p>{getAge(afiliado.fechanac)}</p>
            <p className="flex items-center gap-1">
              <CalendarBlank size={20} weight="duotone" /> {FechaNac}
            </p>
          </div>
          <p>Documento: {afiliado.Documento.toLocaleString('es')}</p>
        </div>
      </div>
      <div className="flex w-full gap-6 border-t-2 px-8 py-6 text-slate-700">
        <ShieldPlus weight="duotone" size={48} className="text-orange-700" />
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-1 text-xl text-blue-600">
            {afiliado.Numero}{' '}
            <span className="text-sm">
              {afiliado.Convenio}, {afiliado.Estado}
            </span>
          </p>
          <p className="flex items-center gap-1">
            <CalendarBlank size={20} weight="duotone" />
            Desde: {InicioCobertura}
          </p>
          {afiliado.Cobertura && (
            <p className="flex items-center gap-1">
              <Info size={22} weight="duotone" /> {afiliado.Cobertura}
              <span> Hasta: {FinCoberturaEsp}</span>
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CardAfiliado;
