import { queryService } from '@lib/utils';
import { getCredencialesGrupo } from '@services/agente';
import { useQuery } from 'react-query';

export const GET_CREDENCIALES_QUERY_KEY = 'credenciales';

const useCredenciales = (agentId: string) => {
  const { data, error, isRefetching } = useQuery(
    [GET_CREDENCIALES_QUERY_KEY, agentId],
    queryService(getCredencialesGrupo, agentId)
  );

  return {
    credenciales: data || [],
    isLoading: isRefetching,
    error,
  };
};

export default useCredenciales;