import { Especialidad } from '@appTypes/especialidad';
import { ServiceResponse } from '@appTypes/gecros';
import { getEspecialidades, getInstituciones, getLocalidades } from '@services/cartilla';
import PageTitle from 'components/Base/PageTitle';
import Tabs, { TabsType } from 'components/Cartilla/Tabs';
import PrestadoresTab from 'components/Cartilla/PrestadoresTab';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Buildings, UsersThree } from 'phosphor-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import InstitucionesTab from 'components/Cartilla/InstitucionesTab';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { defaultQueryOptions, queryService } from '@lib/utils';
import { GET_LOCALIDADES_QUERY_KEY } from 'hooks/cartilla/useLocalidades';
import { GET_INSTITUCIONES_QUERY_KEY } from 'hooks/cartilla/useInstituciones';

const tabs: TabsType = [
  {
    label: 'Prestadores',
    index: 0,
    Component: PrestadoresTab,
    Icon: UsersThree,
    significantProp: 'prestadores',
  },
  {
    label: 'Instituciones',
    index: 1,
    Component: InstitucionesTab,
    Icon: Buildings,
    significantProp: 'instituciones',
  },
];

type CartillaProps = {
  especialidadesResult: ServiceResponse<Especialidad[]>;
};

const Cartilla: NextPage<CartillaProps> = (props) => {
  const { especialidadesResult } = props;
  if (especialidadesResult.message)
    toast.error(especialidadesResult.message, { position: 'bottom-right', duration: 6000 });
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);
  const tab = tabs[selectedTab];
  const payloads = {
    prestadores: { especialidades: especialidadesResult.data || [] },
    instituciones: undefined,
  };
  return (
    <div className=" osap-container">
      <Head>
        <title>Cartilla - OSAP</title>
        <meta
          name="description"
          content="Cartilla medica de OSAP. Encontrá medicos e instituciones en los que proveemos cobertura"
        />
      </Head>
      <PageTitle title="Cartilla médica" />
      <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} payload={payloads[tab.significantProp]} />
    </div>
  );
};

export default Cartilla;

export const getStaticProps: GetStaticProps = async () => {
  const especialidadesResult = await getEspecialidades();
  const queryClient = new QueryClient({ defaultOptions: { queries: defaultQueryOptions } });
  await queryClient.prefetchQuery([GET_LOCALIDADES_QUERY_KEY], queryService(getLocalidades));
  await queryClient.prefetchQuery([GET_INSTITUCIONES_QUERY_KEY], queryService(getInstituciones));
  return {
    props: { especialidadesResult, dehydratedState: dehydrate(queryClient) },
  };
};
