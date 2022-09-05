import { queryService } from '@lib/utils';
import { getAutorizacionesAfiliado } from '@services/agente';
import { useQuery } from 'react-query';

export const GET_AUTORIZACIONES_QUERY_KEY = 'autorizaciones';

const useAutorizaciones = (agentId: string) => {
  const { data, isFetching, error } = useQuery(
    [GET_AUTORIZACIONES_QUERY_KEY, agentId],
    queryService(getAutorizacionesAfiliado, agentId)
  );

  return {
    autorizaciones: data || [],
    isLoading: isFetching,
    error,
  };
};

export default useAutorizaciones;
