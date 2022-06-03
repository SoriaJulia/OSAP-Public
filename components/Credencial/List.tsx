import { Credencial } from '@appTypes/credencial';
import React from 'react';
import CredencialCard from './Card';

type CredencialesProps = {
  credenciales: Array<Credencial>;
  agentId: string;
};

const Credenciales: React.FC<CredencialesProps> = ({ credenciales, agentId }) => {
  return (
    <section className="my-2 flex w-full flex-col  py-6">
      <h3 className="mb-4 text-3xl text-blue-800">Credenciales</h3>
      <div className="flex w-full flex-wrap justify-start gap-6 py-2">
        {credenciales.map((cred) => {
          return <CredencialCard credencial={cred} key={cred.Numero} agentId={agentId} />;
        })}
      </div>
    </section>
  );
};

export default Credenciales;
