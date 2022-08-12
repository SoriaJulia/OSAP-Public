import useCredenciales from 'hooks/credenciales/useCredenciales';
import React from 'react';
import CredencialCard from './Card';

type Props = {
  agentId: string;
};

const Credenciales = ({ agentId }: Props) => {
  const { credenciales, isLoading } = useCredenciales(agentId);

  return (
    <section className="my-2 flex w-full flex-col  py-6">
      <h3 className="mb-4 text-3xl text-blue-800">Credenciales</h3>
      <div className="flex w-full flex-wrap justify-start gap-6 py-2">
        {credenciales.map((cred) => {
          return <CredencialCard isLoading={isLoading} credencial={cred} key={cred.Numero} agentId={agentId} />;
        })}
      </div>
    </section>
  );
};

export default Credenciales;
