import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { Bank, CreditCard, Receipt, Scroll } from 'phosphor-react';
import Button from '../../components/Base/Button';
import PageTitle from '../../components/Base/PageTitle';
import CosegurosTable from '../../components/CosegurosTable';
import Tabs, { TabsType } from '../../components/Base/Tabs';
import FacturasList from '../../components/FacturasList';
// Tabs Array
const tabs: TabsType = [
  {
    label: 'Facturas',
    index: 1,
    Component: FacturasList,
    icon: <Scroll weight="duotone" size={26} />,
  },
  {
    label: 'Coseguros',
    index: 2,
    Component: CosegurosTable,
    icon: <Receipt weight="duotone" size={26} />,
  },
];
const Facturacion: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);

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
        <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
      </section>
    </div>
  );
};

export default Facturacion;
