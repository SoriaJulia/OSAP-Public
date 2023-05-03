import { queryService } from '@lib/utils';
import { getLocalidades } from '@services/cartilla';
import { useQuery } from '@tanstack/react-query';

export const GET_LOCALIDADES_QUERY_KEY = 'localidades';

const useLocalidades = () => {
  const { data, error, isRefetching } = useQuery([GET_LOCALIDADES_QUERY_KEY], queryService(getLocalidades));

  return { localidades: data || [], isLoading: isRefetching, error };
};

export default useLocalidades;
