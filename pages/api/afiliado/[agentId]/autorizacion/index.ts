import { Autorizacion } from '@appTypes/autorizacion';
import axiosClient from '@lib/axios';
import { parseJSONResponse } from '@lib/utils';
import { OSAP_API_URL } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const getAutorizaciones = (agectaId: string) => {
  return `<?xml version="1.0" encoding="utf-8"?>
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
  <soapenv:Header/>
  <soapenv:Body>
     <tem:GetAutorizaciones>
        <tem:AgeCta_id>${agectaId}</tem:AgeCta_id>
     </tem:GetAutorizaciones>
  </soapenv:Body>
  </soapenv:Envelope>`;
};

const getAutorizacionesAfiliado = async (agectaId: string): Promise<Array<Autorizacion>> => {
  try {
    const resp = await axiosClient.post(OSAP_API_URL, getAutorizaciones(agectaId), {
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://tempuri.org/IService1/GetAutorizaciones',
      },
    });
    const parsedResp = parseJSONResponse('GetAutorizaciones', resp.data);
    return parsedResp.Autorizaciones || [];
  } catch (err) {
    const errorMessage = (err as Error)?.message || err;
    const error = new Error(`Error calling webservice. ${errorMessage}`);
    throw error;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const session = await getSession({ req });

  if (session?.user) {
    const facturas = await getAutorizacionesAfiliado(session.user.agentId);
    return res.status(200).json(facturas);
  }
  return res.status(401).end();
};
