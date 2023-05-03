import { Novedad } from '@appTypes/novedad';
import { getNovedadBySlug } from '@services/novedades';
import { useQuery } from '@tanstack/react-query';

type UseNovedadResult = UseNovedadSuccess | UseNovedadFailure;

interface UseNovedadSuccess {
  novedad: Novedad;
  isSuccess: true;
}
interface UseNovedadFailure {
  novedad?: Novedad;
  isSuccess: false;
}

export function useNovedad(slug: string): UseNovedadResult {
  const { data, isSuccess } = useQuery(['novedad', slug], async () => getNovedadBySlug(slug));
  if (isSuccess) return { novedad: data, isSuccess };
  return { novedad: data, isSuccess };
}
