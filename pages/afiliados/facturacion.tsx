import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { Bank, CreditCard, Receipt, Scroll } from 'phosphor-react';
import Button from '../../components/Base/Button';
import PageTitle from '../../components/Base/PageTitle';
import FacturasTable from '../../components/FacturasTable';
import CosegurosTable from '../../components/CosegurosTable';
import Tabs from '../../components/Base/Tabs';

type TabsType = {
  label: string;
  index: number;
  Component: React.FC<any>;
}[];

// Tabs Array
const tabs: TabsType = [
  {
    label: 'Facturas',
    index: 1,
    Component: FacturasTable,
  },
  {
    label: 'Coseguros',
    index: 2,
    Component: CosegurosTable,
  },
];
const Facturacion: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);

  return (
    <div>
      <Head>
        <title>Pagos y Facturación - OSAP</title>
      </Head>
      <div className="flex items-end justify-between">
        <PageTitle title="Pagos y facturación" />
        <div className="flex gap-3">
          <Button label="Medios de pago" trailingIcon={<Bank />} variant="yellowOutlined" />
          <Button label="Pago Online" trailingIcon={<CreditCard />} variant="yellowOutlined" />
          <Button label="Informar pago" trailingIcon={<Receipt />} variant="yellowOutlined" />
        </div>
      </div>
      <section>
        <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
      </section>
    </div>
  );
};

export default Facturacion;
