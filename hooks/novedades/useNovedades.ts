import { queryService } from '@lib/utils';
import { getUltimasNovedades } from '@services/novedades';
import { useQuery } from '@tanstack/react-query';

export const GET_NOVEDADES_QUERY_KEY = 'novedades';

const useNovedades = () => {
  const { data, error, isFetching } = useQuery([GET_NOVEDADES_QUERY_KEY], queryService(getUltimasNovedades));

  return {
    novedades: data || [],
    isLoading: isFetching,
    error,
  };
};

export default useNovedades;
