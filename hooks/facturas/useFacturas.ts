import { queryService } from '@lib/utils';
import { getFacturasAfiliado } from '@services/agente';
import { useQuery } from 'react-query';

export const GET_FACTURAS_QUERY_KEY = 'facturas';

const useFacturas = (agentId: string) => {
  const { data, error, isRefetching } = useQuery(
    [GET_FACTURAS_QUERY_KEY, agentId],
    queryService(getFacturasAfiliado, agentId)
  );

  return {
    facturas: data || [],
    isLoading: isRefetching,
    error,
  };
};

export default useFacturas;
