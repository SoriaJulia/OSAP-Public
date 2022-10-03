/* eslint-disable camelcase */
import { GetServerSideProps } from 'next';
import { Bank, CreditCard, CurrencyCircleDollar, Download } from 'phosphor-react';
import Head from 'next/head';
import { defaultQueryOptions, queryService } from '@lib/utils';
import Credenciales from 'components/Credencial/List';
import UltimasAutorizaciones from 'components/Facturacion/UltimasAutorizaciones';
import { useRouter } from 'next/router';
import { getLinkPago } from '@lib/facturacion';
import { dehydrate, QueryClient } from 'react-query';
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
import { unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from 'pages/api/auth/[...nextauth]';
import User from '@appTypes/user';
import { GET_AUTORIZACIONES_QUERY_KEY } from 'hooks/autorizaciones/useAutorizaciones';
import { GET_FACTURAS_QUERY_KEY } from 'hooks/facturas/useFacturas';
import { GET_CREDENCIALES_QUERY_KEY } from 'hooks/credenciales/useCredenciales';
import { GET_COSEGUROS_QUERY_KEY } from 'hooks/coseguros/useCoseguros';

type Props = {
  user: User;
};

export const Afiliados = ({ user }: Props) => {
  const router = useRouter();
  const linkPago = getLinkPago(user.agentId, user.convenio);

  return (
    <div className="flex flex-col items-center gap-3 divide-y-2 divide-white text-left">
      <Head>
        <title>Tramites y consultas online - OSAP</title>
      </Head>
      <AfiliadosSectionsNav />
      <Credenciales agentId={user.agentId} />

      <section className="flex w-full flex-col items-start pt-8">
        <h3 className="mb-6 text-3xl text-blue-800 md:mb-0">Pagos y facturación</h3>
        <div className="flex w-full justify-end gap-1 px-2 pb-4 sm:gap-4 sm:px-6 xs:gap-2">
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
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (!session || session.status === 'unauthenicated' || !session.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { agentId } = session.user;

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
