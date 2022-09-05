/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { Bank, CreditCard, CurrencyCircleDollar, Download, Note, Receipt, Scroll } from 'phosphor-react';
import { defaultQueryOptions, queryService } from '@lib/utils';
import { Factura } from '@appTypes/factura';
import AutorizacionesTab from 'components/Facturacion/AutorizacionesTab';
import { Autorizacion } from '@appTypes/autorizacion';
import { useRouter } from 'next/router';
import { getLinkPago } from '@lib/facturacion';
import { Coseguro } from '@appTypes/coseguro';
import { AgenteCta } from '@appTypes/agenteCta';
import User from '@appTypes/user';
import { nextAuthOptions } from 'pages/api/auth/[...nextauth]';
import { dehydrate, QueryClient } from 'react-query';
import { GET_FACTURAS_QUERY_KEY } from 'hooks/facturas/useFacturas';
import { getAutorizacionesAfiliado, getCosegurosAfiliado, getFacturasAfiliado } from '@services/agente';
import { GET_AUTORIZACIONES_QUERY_KEY } from 'hooks/autorizaciones/useAutorizaciones';
import { GET_COSEGUROS_QUERY_KEY } from 'hooks/coseguros/useCoseguros';
import Button from '../../components/Base/Button';
import PageTitle from '../../components/Base/PageTitle';
import Tabs, { TabsType } from '../../components/Base/Tabs';
import FacturasTab from '../../components/Facturacion/FacturasTab';
import CosegurosTab from '../../components/Facturacion/CosegurosTab';

// Tabs Array
const tabs: TabsType = [
  {
    label: 'Facturas',
    index: 0,
    Component: FacturasTab,
    Icon: Scroll,
  },
  {
    label: 'Autorizaciones',
    index: 1,
    Component: AutorizacionesTab,
    Icon: Note,
  },
  {
    label: 'Coseguros y Cargos',
    index: 2,
    Component: CosegurosTab,
    Icon: Receipt,
  },
];
type FacturacionProps = {
  facturas: Array<Factura>;
  coseguros: Array<Coseguro>;
  autorizaciones: Array<Autorizacion>;
  agente: AgenteCta;
  user: User;
};

const Facturacion: NextPage<FacturacionProps> = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);
  const router = useRouter();
  const linkPago = getLinkPago(user.agentId, user.convenio);
  return (
    <div>
      <Head>
        <title>Pagos y Facturación - OSAP</title>
      </Head>
      <div className="flex flex-wrap items-center justify-between">
        <PageTitle title="Pagos y facturación" />
        <div className="flex gap-3">
          <Button
            label="Medios de pago"
            trailingIcon={<Bank size={22} />}
            variant="fill"
            onClick={() => {
              router.push('/afiliados/mediosPago');
            }}
          />
          <Button
            label="Pago Online"
            trailingIcon={<CreditCard size={22} />}
            variant="fill"
            onClick={() => window.open(linkPago, '_blank')}
          />
          <Button
            label="Informar pago"
            variant="fill"
            trailingIcon={<CurrencyCircleDollar size={22} />}
            onClick={() => router.push('/afiliados/informarPago')}
          />
        </div>
      </div>
      <section className="mt-2">
        <Tabs agentId={user.agentId} selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
      </section>
      <section className="mt-6">
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
      </section>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (!session || session.status === 'unauthenicated') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const { agentId } = session.user;

  const queryClient = new QueryClient({ defaultOptions: { queries: defaultQueryOptions } });

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

export default Facturacion;
