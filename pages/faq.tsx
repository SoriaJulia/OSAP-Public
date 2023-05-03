import SearchInput from '@components/Base/SearchInput';
import FaqList from '@components/Faqs/List';
import { changeTextInput, defaultQueryOptions, queryService } from '@lib/utils';
import { getFaqs } from '@services/faqs';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useDebounce } from 'hooks/useDebounce';
import useFaqs, { GET_FAQS_QUERY_KEY } from 'hooks/useFaqs';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const DEBOUNCE_SEARCH_TIME = 300;

const Faq = () => {
  const [filter, setFilter] = useState('');
  const debouncedSearchTerm = useDebounce(filter, DEBOUNCE_SEARCH_TIME);
  const { faqs, refetch, remove, isLoading, error } = useFaqs({ filter: debouncedSearchTerm });
  useEffect(() => {
    remove();
    refetch();
  }, [debouncedSearchTerm, refetch, remove]);
  return (
    <div>
      <Head>
        <title>OSAP - Preguntas Frecuentes</title>
      </Head>
      <div className=" mb-8 flex flex-col items-center gap-9 rounded-sm bg-gradient-to-br from-sky-100 via-slate-100 to-teal-50 pt-10">
        <h1 className="mt-6 w-max  text-5xl text-slate-600">¡Hola! ¿En que podemos ayudarte?</h1>
        <div className="flex items-center gap-1">
          <hr className="w-9 border-b-2 border-sky-600/60" />
          <hr className="w-2 border-b-2 border-sky-600/60" />
        </div>
        <div className="osap-container mb-6 flex w-full flex-col">
          <SearchInput value={filter} onChange={changeTextInput(setFilter)} />
          <p className="ml-4 mt-2 text-xs text-slate-500">Ingresá palabras claves relacionadas a tu duda</p>
        </div>
      </div>
      <section className="osap-container flex flex-col gap-4 md:ml-36">
        <FaqList faqs={faqs} isLoading={isLoading} filter={filter} error={error} />
      </section>
    </div>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: defaultQueryOptions } });
  await queryClient.prefetchQuery([GET_FAQS_QUERY_KEY], queryService(getFaqs));
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Faq;
