import { Factura } from '@appTypes/factura';
import axiosClient from '@lib/axios';
import { parseJSONResponse } from '@lib/utils';
import { OSAP_API_URL } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const getAgenteCta = (dni: string) => {
  return `<?xml version="1.0" encoding="utf-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
     <soapenv:Header/>
     <soapenv:Body>
        <tem:GetAgenteCta>
           <!--Optional:-->
           <tem:DNI>${dni}</tem:DNI>
        </tem:GetAgenteCta>
     </soapenv:Body>
  </soapenv:Envelope>`;
};

const getAgente = async (agectaId: string): Promise<Array<Factura>> => {
  try {
    const resp = await axiosClient.post(OSAP_API_URL, getAgenteCta(agectaId), {
      headers: { 'Content-Type': 'text/xml;charset=UTF-8', 'SOAPAction': 'http://tempuri.org/IService1/GetAgenteCta' },
    });
    const parsedResp = parseJSONResponse('GetAgenteCta', resp.data);
    return parsedResp.AgentesCta[0] || {};
  } catch (err) {
    const errorMessage = (err as Error)?.message || err;
    const error = new Error(`Error calling webservice. ${errorMessage}`);
    throw error;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const session = await getSession({ req });

  if (session?.user) {
    const agent = await getAgente(session.user.dni);
    return res.status(200).json(agent);
  }
  return res.status(401).end();
};
