import { parseSOAPResponse } from '@lib/utils';
import axiosClient from '@lib/axios';
import { GECROS_API_URL, OSAP_API_URL } from 'config';
import { GECROSBaseResponse, ServiceResponse } from '@appTypes/gecros';
import { Especialidad } from '@appTypes/especialidad';
import { Prestador, TiposPrestador } from '@appTypes/prestador';
import { SERVER_ERROR } from '@lib/constants';
import { SanityClient } from '@lib/sanity';
import { Localidad } from '@appTypes/localidad';
import { Institucion } from '@appTypes/institucion';
import _, { isEmpty } from 'lodash';

const consultarEspecialidades = (): string => {
  return `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
  <soap:Header/>
  <soap:Body>
     <tem:ConsultarEspecialidades>
        <tem:pUsuario>${process.env.OSAP_GECROS_USER}</tem:pUsuario>
        <tem:pClave>${process.env.OSAP_GECROS_PASS}</tem:pClave>
     </tem:ConsultarEspecialidades>
  </soap:Body>
</soap:Envelope>`;
};

interface ConsultarEspecialidadesResponse extends GECROSBaseResponse {
  Especialidades: Array<Especialidad>;
}

export const getEspecialidades = async (): Promise<ServiceResponse<Array<Especialidad>>> => {
  const ACTION_NAME = 'ConsultarEspecialidades';
  try {
    const resp = await axiosClient.post(GECROS_API_URL, consultarEspecialidades(), {
      headers: { SOAPAction: ACTION_NAME },
    });
    const parsedResp = parseSOAPResponse<ConsultarEspecialidadesResponse>(resp.data, {
      actionName: ACTION_NAME,
      resultName: '',
    });

    if (parsedResp.Mensaje) {
      return { data: null, message: parsedResp.Mensaje };
    }

    const orderedSpec = _.orderBy(parsedResp.Especialidades, (e) => e.Descripcion);
    return { data: orderedSpec, message: '' };
  } catch (err) {
    console.error(err);
    return { data: null, message: 'Error interno del servidor' };
  }
};

export const getLocalidades = (): Promise<ServiceResponse<Array<Localidad>>> => {
  return SanityClient.fetch<Localidad[]>(`*[_type == "localidad"]| order(lower(nombre) asc)`)
    .then((data) => {
      return { data, message: '' };
    })
    .catch((err) => {
      return { data: null, message: err };
    });
};

export const getInstituciones = (): Promise<ServiceResponse<Array<Institucion>>> => {
  return SanityClient.fetch<Institucion[]>(
    `*[_type == "institucion"]{
    _id,
    nombre,
    pageUrl,
    domicilio,
    "localidad": localidad->{nombre, gecrosID, provincia},
    telefono,
    cartillaUrl,
    "fileUrl":archivo.asset->url
  }`
  )
    .then((data) => {
      return { data, message: '' };
    })
    .catch((err) => {
      return { data: null, message: err };
    });
};

const getPrestadores = (nombre: string, tipoPrestador: string, especialidad: string, localidad: string) => {
  let isFarmacia = 0;
  if (tipoPrestador === TiposPrestador.Farmacias) isFarmacia = 1;
  return `${OSAP_API_URL}/getCartillaPrestadores?PreNom=${nombre}&TipoPreId=${tipoPrestador}&EspId=${especialidad}&LocId=${localidad}&Farmacias=${isFarmacia}`;
};

const NO_PRESTADOR_MESSAGE = 'No se encontro ningun prestador que coincida con los filtros de busqueda seleccionados';

export const getCartillaPrestadores = async (
  nombre: string,
  tipoPrestador: string,
  especialidad: string,
  localidad: string
): Promise<ServiceResponse<Prestador[]>> => {
  try {
    const resp = await axiosClient.get<{ CartillaPrestadores: Prestador[] }>(
      getPrestadores(nombre, tipoPrestador, especialidad, localidad)
    );

    if (isEmpty(resp.data.CartillaPrestadores)) {
      return { data: null, message: NO_PRESTADOR_MESSAGE };
    }
    return { data: resp.data.CartillaPrestadores, message: '' };
  } catch (err) {
    console.error(err);
    return { data: null, message: SERVER_ERROR };
  }
};
