import { queryService } from '@lib/utils';
import { getInstituciones } from '@services/cartilla';
import { useQuery } from '@tanstack/react-query';

export const GET_INSTITUCIONES_QUERY_KEY = 'instituciones';

const useInstituciones = () => {
  const { data, error, isFetching, status } = useQuery([GET_INSTITUCIONES_QUERY_KEY], queryService(getInstituciones));

  return { instituciones: data || [], isLoading: isFetching, error };
};

export default useInstituciones;
