import { Prestador } from '@appTypes/prestador';
import { queryService } from '@lib/utils';
import { getCartillaPrestadores } from '@services/cartilla';
import { useMutation } from '@tanstack/react-query';

export const GET_PRESTADORES_QUERY_KEY = 'prestadores';

const usePrestadores = (nombre: string, tipoPrestador: string, especialidad: string, localidad: string) => {
  const { data, error, mutate, isLoading } = useMutation<Prestador[] | null, string>(
    [GET_PRESTADORES_QUERY_KEY, nombre, tipoPrestador, especialidad, localidad],
    queryService(getCartillaPrestadores, nombre, tipoPrestador, especialidad, localidad)
  );
  return { prestadores: data, isLoading, error, mutate };
};

export default usePrestadores;
