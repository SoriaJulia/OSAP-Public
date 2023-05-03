import { ServiceResponse } from '@appTypes/gecros';
import { Novedad } from '@appTypes/novedad';
import { SERVER_ERROR } from '@lib/constants';
import { SanityClient } from '@lib/sanity';
import { isEmpty } from 'lodash';

type GetNovedadesParams = { lastPublishedAt?: string; lastId?: string; pageSize?: number; filterTitle?: string };
type PaginatedNovedadesResult = { page: Novedad[]; hasNextPage: boolean };

const NovedadEntityString = `{
  _id, titulo, contenido, "imgUrl": imagen.asset->url, fechaPublicacion, "slug": slug.current, "miniaturaUrl": miniatura.asset->url
}`;

export const getPaginatedNovedades = async ({
  lastId = '',
  lastPublishedAt = new Date().toDateString(),
  pageSize = 4,
  filterTitle = '',
}: GetNovedadesParams): Promise<PaginatedNovedadesResult> => {
  const page = await SanityClient.fetch<Novedad[]>(
    `*[_type == "novedad" && titulo match "*" + $filterTitle + "*" && (
        fechaPublicacion < $lastPublishedAt
      || (fechaPublicacion == $lastPublishedAt && _id > $lastId)
    )] | order(fechaPublicacion desc) [0...$pageSize]${NovedadEntityString}`,
    { lastPublishedAt, lastId, pageSize, filterTitle }
  );

  const nextLastNovedad = page.at(-1);
  if (!nextLastNovedad) {
    return { page: [], hasNextPage: false };
  }

  const nextPageCount = await SanityClient.fetch(
    `count(*[_type == "novedad" && titulo match "*" + $filterTitle + "*" && (
      fechaPublicacion < $lastPublishedAt
      || (fechaPublicacion == $lastPublishedAt && _id > $lastId)
    )])`,
    { lastPublishedAt: nextLastNovedad.fechaPublicacion, lastId: nextLastNovedad._id, filterTitle }
  );
  return { page, hasNextPage: nextPageCount > 0 };
};

export const getNovedadBySlug = async (slug: string): Promise<Novedad> => {
  const novedades = await SanityClient.fetch(
    `
    *[_type == "novedad" && slug.current match $slug]${NovedadEntityString}
  `,
    { slug }
  );

  if (isEmpty(novedades)) throw new Error('No se encontraron novedades');

  return novedades[0];
};

export const getUltimasNovedades = async (): Promise<ServiceResponse<Novedad[]>> => {
  try {
    const lastPublishedAt = new Date().toDateString();
    const pageSize = 3;
    const resp = await SanityClient.fetch<Novedad[]>(
      `*[_type == "novedad" && ( fechaPublicacion < $lastPublishedAt
    )] | order(fechaPublicacion desc) [0...$pageSize]${NovedadEntityString}`,
      { lastPublishedAt, pageSize }
    );

    if (isEmpty(resp)) {
      return { data: null, message: '' };
    }
    return { data: resp, message: '' };
  } catch (err) {
    console.error(err);
    return { data: null, message: SERVER_ERROR };
  }
};
