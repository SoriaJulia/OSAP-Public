import { queryService } from '@lib/utils';
import { getFaqs } from '@services/faqs';
import { useQuery } from '@tanstack/react-query';

export const GET_FAQS_QUERY_KEY = 'faqs';

const useFaqs = ({ filter }: { filter?: string }) => {
  const { data, error, isLoading, refetch, remove, isRefetching } = useQuery(
    [GET_FAQS_QUERY_KEY],
    queryService(getFaqs, { filter })
  );

  return { faqs: data || [], isLoading, error, refetch, remove, isRefetching };
};

export default useFaqs;
