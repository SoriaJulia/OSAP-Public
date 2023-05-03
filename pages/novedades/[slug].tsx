import { GetServerSideProps } from 'next';
import React, { useRef } from 'react';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import { defaultQueryOptions } from '@lib/utils';
import { getNovedadBySlug } from '@services/novedades';
import { ParsedUrlQuery } from 'querystring';
import { PortableText } from '@portabletext/react';
import Head from 'next/head';
import PageHeader from '@components/Base/PageHeader';
import dynamic from 'next/dynamic';
import { useReactToPrint } from 'react-to-print';
import { SanityImage } from '@components/Base/SanityImage';
import { useNovedad } from 'hooks/novedades/useNovedad';
import { ArrowLeft, CalendarBlank } from 'phosphor-react';

const NovedadActionButtons = dynamic(() => import('@components/Novedades/ActionButtons'), { ssr: false });

type Props = { slug: string };

const portableTextComponents = {
  types: {
    image: SanityImage,
  },
};
function NovedadPage({ slug }: Props) {
  const { novedad, isSuccess } = useNovedad(slug);

  const novedadPageRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => novedadPageRef.current,
  });

  if (isSuccess) {
    const fechaPublicacion = new Date(novedad.fechaPublicacion);
    return (
      <div ref={novedadPageRef} className=" osap-container flex flex-col text-left print:p-5">
        <Head>
          <title>{novedad.titulo}</title>
        </Head>
        <a className="icon-button mb-4 flex w-max gap-2 pr-4 print:hidden" href="/novedades">
          <ArrowLeft size={24} />
          Todas las novedades
        </a>
        <section className="">
          <PageHeader>
            <div className="mb-3 flex justify-between">
              <h1 className="font-display text-5xl font-thin text-blue-700">{novedad.titulo} </h1>
              <NovedadActionButtons slug={slug} printNovedad={handlePrint} />
            </div>
            <p className="flex items-center gap-1 font-display text-lg text-slate-500">
              <CalendarBlank size={22} />
              {fechaPublicacion.toLocaleDateString()}
            </p>
          </PageHeader>
          <article className="novedad mt-5">
            {novedad.imgUrl && (
              <img
                width={600}
                height={400}
                src={novedad.imgUrl}
                className="-mt-4 mb-4 mr-8 print:float-none lg:float-left"
                alt="Novedad"
              />
            )}
            <PortableText value={novedad.contenido} components={portableTextComponents} />
          </article>
        </section>
      </div>
    );
  }
  return null;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface ServerSideResult {
  dehydratedState?: DehydratedState;
  slug: string;
}

export const getServerSideProps: GetServerSideProps<ServerSideResult, Params> = async ({ params }) => {
  if (!params) {
    return { props: { slug: '' } };
  }

  const { slug } = params;
  const queryClient = new QueryClient({ defaultOptions: { queries: defaultQueryOptions } });
  await queryClient.prefetchQuery(['novedad', slug], async () => {
    return getNovedadBySlug(slug);
  });
  return { props: { dehydratedState: dehydrate(queryClient), slug } };
};

export default NovedadPage;
