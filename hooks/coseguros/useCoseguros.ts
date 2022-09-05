import { queryService } from '@lib/utils';
import { getCosegurosAfiliado } from '@services/agente';
import { useQuery } from 'react-query';

export const GET_COSEGUROS_QUERY_KEY = 'coseguros';

const useCoseguros = (agentId: string) => {
  const { data, isFetching, error } = useQuery(
    [GET_COSEGUROS_QUERY_KEY, agentId],
    queryService(getCosegurosAfiliado, agentId)
  );

  return {
    coseguros: data || [],
    isLoading: isFetching,
    error,
  };
};

export default useCoseguros;
