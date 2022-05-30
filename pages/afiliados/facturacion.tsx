/* eslint-disable react/destructuring-assignment */
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { Bank, CreditCard, Receipt, Scroll } from 'phosphor-react';
import { nextFetch } from '@lib/utils';
import { getSession } from 'next-auth/react';
import { Factura } from '@appTypes/factura';
import Button from '../../components/Base/Button';
import PageTitle from '../../components/Base/PageTitle';
import Tabs, { TabsType } from '../../components/Base/Tabs';
import FacturasTab from '../../components/Facturacion/FacturasTab';
import CosegurosList from '../../components/Facturacion/CosegurosList';

// Tabs Array
const tabs: TabsType = [
  {
    label: 'Facturas',
    index: 0,
    Component: FacturasTab,
    icon: <Scroll weight="duotone" size={26} />,
    significantProp: 'facturas',
  },
  {
    label: 'Coseguros y Cargos',
    index: 1,
    Component: CosegurosList,
    icon: <Receipt weight="duotone" size={26} />,
    significantProp: 'coseguros',
  },
];
type FacturacionProps = {
  facturas: Array<Factura>;
  coseguros: Array<Factura>;
};

const Facturacion: NextPage<FacturacionProps> = (props) => {
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);
  const tab = tabs[selectedTab];

  return (
    <div>
      <Head>
        <title>Pagos y Facturación - OSAP</title>
      </Head>
      <div className="flex flex-wrap items-center justify-between">
        <PageTitle title="Pagos y facturación" />
        <div className="flex gap-3">
          <Button label="Medios de pago" trailingIcon={<Bank weight="fill" />} variant="fill" />
          <Button label="Pago Online" trailingIcon={<CreditCard weight="fill" />} variant="fill" />
          <Button label="Informar pago" trailingIcon={<Receipt weight="fill" />} variant="fill" />
        </div>
      </div>
      <section className="mt-2">
        <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} payload={props[tab.significantProp]} />
      </section>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session || session.status === 'unauthenicated') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // call consultar facturas
  try {
    const facturas = await nextFetch(`afiliado/${session.user?.agentId}/factura`, {
      headers: { Cookie: req.headers.cookie || '' },
    });
    return {
      props: { facturas },
    };
  } catch (err) {
    console.error(err);

    // TODO check for default values for pages props
    return {
      props: {
        facturas: [],
      },
    };
  }
};

export default Facturacion;
