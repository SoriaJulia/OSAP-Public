import { OSAP_API_URL } from 'config';
import { AgenteCta } from '@appTypes/agenteCta';
import axiosClient from '@lib/axios';
import { ServiceResponse } from '@appTypes/gecros';
import { isEmpty } from 'lodash';
import { SERVER_ERROR } from '@lib/constants';
import { Autorizacion } from '@appTypes/autorizacion';
import { Credencial } from '@appTypes/credencial';
import { Factura } from '@appTypes/factura';
import { Coseguro } from '@appTypes/coseguro';

const NO_AGENT_MESSAGE = 'No se encontro ningun agente con este DNI';

export const getAgente = async (dni: string): Promise<ServiceResponse<AgenteCta>> => {
  try {
    const response = await axiosClient.get<{ AgentesCta: AgenteCta[] }>(`${OSAP_API_URL}/getAgenteCta?Dni=${dni}`);

    if (isEmpty(response.data.AgentesCta)) {
      return { data: null, message: NO_AGENT_MESSAGE };
    }

    return { data: response.data.AgentesCta[0], message: '' };
  } catch (err) {
    console.error(err);
    return { data: null, message: SERVER_ERROR };
  }
};

const NO_AUTORIZACIONES_MESSAGE = 'No se encontro ninguna autorizacion con este codigo';

export const getAutorizacionesAfiliado = async (agectaId: string): Promise<ServiceResponse<Autorizacion[]>> => {
  try {
    const resp = await axiosClient.get<{ Autorizaciones: Autorizacion[] }>(
      `${OSAP_API_URL}/getAutorizaciones?AgeCtaId=${agectaId}`
    );
    if (isEmpty(resp.data.Autorizaciones)) {
      return { data: null, message: NO_AUTORIZACIONES_MESSAGE };
    }

    return { data: resp.data.Autorizaciones, message: '' };
  } catch (err) {
    console.error(err);
    return { data: null, message: SERVER_ERROR };
  }
};

const NO_GRUPO_MESSAGE = 'No se encontro ninguna credencial con este codigo';

export const getCredencialesGrupo = async (agectaId: string): Promise<ServiceResponse<Credencial[]>> => {
  try {
    const resp = await axiosClient.get<{ Grupo: Credencial[] }>(`${OSAP_API_URL}/getGrupo?AgeCtaId=${agectaId}`);

    if (isEmpty(resp.data.Grupo)) {
      return { data: null, message: NO_GRUPO_MESSAGE };
    }

    return { data: resp.data.Grupo, message: '' };
  } catch (err) {
    console.error(err);
    return { data: null, message: SERVER_ERROR };
  }
};

const NO_FACTURA_MESSAGE = 'No se encontro ninguna factura con este codigo';

export const getFacturasAfiliado = async (agectaId: string): Promise<ServiceResponse<Factura[]>> => {
  try {
    const resp = await axiosClient.get<{ Facturas: Factura[] }>(`${OSAP_API_URL}/getFacturas?AgeCtaId=${agectaId}`);

    if (isEmpty(resp.data.Facturas)) {
      return { data: null, message: NO_FACTURA_MESSAGE };
    }
    return { data: resp.data.Facturas, message: '' };
  } catch (err) {
    console.error(err);
    return { data: null, message: SERVER_ERROR };
  }
};

const NO_COSEGURO_MESSAGE = 'No se encontro ningun coseguro con este codigo';

export const getCosegurosAfiliado = async (agectaId: string): Promise<ServiceResponse<Coseguro[]>> => {
  try {
    const resp = await axiosClient.get<{ Coseguros: Coseguro[] }>(`${OSAP_API_URL}/getCoseguros?AgeCtaId=${agectaId}`);

    if (isEmpty(resp.data.Coseguros)) {
      return { data: null, message: NO_COSEGURO_MESSAGE };
    }
    return { data: resp.data.Coseguros, message: '' };
  } catch (err) {
    console.error(err);
    return { data: null, message: SERVER_ERROR };
  }
};
