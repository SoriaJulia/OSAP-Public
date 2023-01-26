import { queryService } from '@lib/utils';
import { getAfiliadosPorNumero, getAfiliadosPorNombre, getAfiliadosPorDocumento } from '@services/afiliados';
import { useMutation, useQuery } from 'react-query';

export const GET_AFILIADOS_QUERY_KEY = 'afiliados';
const searchServices = {
  Numero: getAfiliadosPorNumero,
  Nombre: getAfiliadosPorNombre,
  Documento: getAfiliadosPorDocumento,
};

const useAfiliados = (searchOpt: keyof typeof searchServices, searchText: string) => {
  const { data, isLoading, error, mutate, isSuccess, isError } = useMutation(
    [GET_AFILIADOS_QUERY_KEY, searchText],
    queryService(searchServices[searchOpt], searchText)
  );

  return {
    afiliados: data || [],
    isLoading,
    mutate,
    error,
    isSuccess,
    isError,
  };
};

export default useAfiliados;
