import { Afiliado } from '@appTypes/afiliado';
import { ServiceResponse } from '@appTypes/gecros';
import axiosClient from '@lib/axios';
import { SERVER_ERROR } from '@lib/constants';
import { OSAP_API_URL } from 'config';
import { isEmpty } from 'lodash';

export const getAfiliadosPorNombre = async (text: string): Promise<ServiceResponse<Afiliado[]>> => {
  try {
    const [apellido, nombre = ''] = text.split(',');
    const resp = await axiosClient.get<{ Afiliados: Afiliado[] }>(
      `${OSAP_API_URL}/getAfiliadosPorNombre?Apellido=${apellido.trim()}&Nombre=${nombre.trim()}`
    );

    if (isEmpty(resp.data.Afiliados)) {
      return { data: null, message: '' };
    }
    return { data: resp.data.Afiliados, message: '' };
  } catch (err) {
    console.error(err);
    return { data: null, message: SERVER_ERROR };
  }
};
export const getAfiliadosPorNumero = async (text: string): Promise<ServiceResponse<Afiliado[]>> => {
  try {
    const resp = await axiosClient.get<{ Afiliados: Afiliado[] }>(
      `${OSAP_API_URL}/getAfiliadosPorNumero?Numero=${text}`
    );

    if (isEmpty(resp.data.Afiliados)) {
      return { data: null, message: '' };
    }
    return { data: resp.data.Afiliados, message: '' };
  } catch (err) {
    console.error(err);
    return { data: null, message: SERVER_ERROR };
  }
};
export const getAfiliadosPorDocumento = async (text: string): Promise<ServiceResponse<Afiliado[]>> => {
  try {
    const resp = await axiosClient.get<{ Afiliados: Afiliado[] }>(
      `${OSAP_API_URL}/getAfiliadosPorDocumento?Documento=${text}`
    );

    if (isEmpty(resp.data.Afiliados)) {
      return { data: null, message: '' };
    }
    return { data: resp.data.Afiliados, message: '' };
  } catch (err) {
    console.error(err);
    return { data: null, message: SERVER_ERROR };
  }
};
