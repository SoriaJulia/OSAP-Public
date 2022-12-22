import Button from '@components/Base/Button';
import CardSkeleton from '@components/Base/CardSkeleton';
import useCredenciales from 'hooks/credenciales/useCredenciales';
import { useRouter } from 'next/router';
import { Books } from 'phosphor-react';
import React from 'react';
import CredencialCard from './Card';

type Props = {
  agentId: string;
};

const Credenciales = ({ agentId }: Props) => {
  const router = useRouter();
  const { credenciales, isLoading } = useCredenciales(agentId);
  const skeletonsList = [];

  for (let index = 0; index < 2; index += 1) {
    skeletonsList.push(<CardSkeleton variant="orange" width="w-96" key={index} />);
  }

  if (isLoading) return <div className="flex w-full gap-3 py-6">{skeletonsList}</div>;

  return (
    <section className="my-2 flex w-full flex-col  py-6">
      <h3 className="mb-4 text-3xl text-blue-800">Credenciales</h3>
      <div className="flex w-full justify-end gap-1 px-2 pb-4 sm:gap-4 sm:px-6 xs:gap-2">
        <Button
          label="Certificado de Estudio"
          onClick={() => router.push('/afiliados/certificados')}
          variant="yellowFill"
          leadingIcon={<Books size={24} />}
        />
      </div>
      <div className="flex w-full flex-wrap justify-start gap-6 py-2">
        {credenciales.map((cred) => {
          return <CredencialCard credencial={cred} key={cred.Numero} agentId={agentId} />;
        })}
      </div>
    </section>
  );
};

export default Credenciales;
