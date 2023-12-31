/* eslint-disable camelcase */
import { GetServerSideProps } from 'next';
import { Bank, Bell, CreditCard, CurrencyCircleDollar, Download, X } from 'phosphor-react';
import Head from 'next/head';
import { defaultQueryOptions, queryService } from '@lib/utils';
import Credenciales from 'components/Credencial/List';
import UltimasAutorizaciones from 'components/Facturacion/UltimasAutorizaciones';
import { useRouter } from 'next/router';
import { getLinkPago } from '@lib/facturacion';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Button from '@components/Base/Button';
import AfiliadosSectionsNav from '@components/AfiliadosSectionsNav';
import UltimasFacturas from '@components/Facturacion/UltimasFacturas';
import UltimosCoseguros from '@components/Facturacion/UltimosCoseguros';
import {
  getAutorizacionesAfiliado,
  getCosegurosAfiliado,
  getCredencialesGrupo,
  getFacturasAfiliado,
} from '@services/agente';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from 'pages/api/auth/[...nextauth]';
import User from '@appTypes/user';
import { GET_AUTORIZACIONES_QUERY_KEY } from 'hooks/autorizaciones/useAutorizaciones';
import { GET_FACTURAS_QUERY_KEY } from 'hooks/facturas/useFacturas';
import { GET_CREDENCIALES_QUERY_KEY } from 'hooks/credenciales/useCredenciales';
import { GET_COSEGUROS_QUERY_KEY } from 'hooks/coseguros/useCoseguros';
import { useEffect, useState } from 'react';

type Props = {
  user: User;
};

export const Afiliados = ({ user }: Props) => {
  const router = useRouter();
  const linkPago = user.convenio && getLinkPago(user.agentId, user.convenio);
  const [showTravelBanner, setShowTravelBanner] = useState('false');
  useEffect(() => {
    const storageItem = localStorage.getItem('showTravelBanner');
    if (storageItem) setShowTravelBanner(storageItem);
  }, []);

  const dismissTravelBanner = () => {
    setShowTravelBanner('false');
    localStorage.setItem('showTravelBanner', 'false');
  };

  return (
    <div className="flex flex-col items-center gap-3 divide-y-2 divide-white pt-8 text-left">
      <Head>
        <title>Tramites y consultas online - OSAP</title>
      </Head>
      <AfiliadosSectionsNav />
      <Credenciales agentId={user.agentId} />
      <section className=" osap-container flex w-full flex-col items-start pt-8">
        <h3 className="mb-6 text-3xl text-blue-800 md:mb-0">Pagos y facturación</h3>
        <div className="flex w-full justify-end gap-1 px-2 pb-4 xs:gap-2 sm:gap-4 sm:px-6">
          <Button
            label="Medios de pago"
            variant="yellowFill"
            leadingIcon={<Bank size={24} />}
            onClick={() => router.push('/afiliados/mediosPago')}
          />
          <Button
            label="Pago online"
            variant="yellowFill"
            leadingIcon={<CreditCard size={24} />}
            onClick={() => window.open(linkPago, '_blank')}
          />
          <Button
            label="Informar pago"
            variant="yellowFill"
            leadingIcon={<CurrencyCircleDollar size={24} />}
            onClick={() => router.push('/afiliados/informarPago')}
          />
        </div>
        <UltimasFacturas agentId={user.agentId} />
        <UltimasAutorizaciones agentId={user.agentId} />
        <UltimosCoseguros agentId={user.agentId} />

        <article className="mt-2 w-full px-4 text-left md:px-8 lg:w-3/4 lg:px-0">
          <a
            href="http://www.osapsalud.com.ar/descargar_pdf.php?archivo=wordpress/wp-content/uploads/folleto_reintegros_2016.pdf"
            className="flex items-center gap-2 py-2 text-blue-700 transition-all hover:text-blue-500 hover:underline hover:decoration-blue-500 md:text-lg"
            target="_blank"
          >
            <Download /> Formulario de acreditación automática de reintegros
          </a>
          <a
            href="http://www.osapsalud.com.ar/descargar_pdf.php?archivo=wordpress/wp-content/uploads/AUTORIZACION%20DE%20DEBITO%20AUTOMATICO%20OSAP.pdf"
            className="flex items-center gap-2 py-2 text-blue-700 decoration-blue-300 hover:text-blue-500 hover:underline hover:decoration-blue-500 md:text-lg"
            target="_blank"
          >
            <Download /> Formulario de autorización débito automático de cuenta bancaria
          </a>
        </article>
      </section>
      {showTravelBanner === 'true' && (
        <div className="info-banner">
          <a href="https://assistravel.info/registro" target="_blank" className="info-banner-content">
            <Bell weight="duotone" className="animate-sideBounce" size={24} />
            <span className="font-bold">¿Estas por viajar dentro del país?</span> Recordá completar el
            <span className="underline">registro de viaje de Assist Travel</span>para poder contar con cobertura y
            viajar tranquilo.
          </a>

          <X onClick={dismissTravelBanner} size={32} className="ml-2 flex-shrink-0 p-2" />
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { agentId } = session.user;
  if (agentId === '0') {
    return { redirect: { destination: '/prestadores', permanent: false } };
  }

  const queryClient = new QueryClient({ defaultOptions: { queries: defaultQueryOptions } });

  queryClient.prefetchQuery([GET_CREDENCIALES_QUERY_KEY, agentId], queryService(getCredencialesGrupo, agentId));
  queryClient.prefetchQuery([GET_COSEGUROS_QUERY_KEY, agentId], queryService(getCosegurosAfiliado, agentId));
  queryClient.prefetchQuery([GET_FACTURAS_QUERY_KEY, agentId], queryService(getFacturasAfiliado, agentId));
  queryClient.prefetchQuery([GET_AUTORIZACIONES_QUERY_KEY, agentId], queryService(getAutorizacionesAfiliado, agentId));

  return {
    props: {
      user: session.user,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Afiliados;
