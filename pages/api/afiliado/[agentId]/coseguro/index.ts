import { Coseguro } from '@appTypes/coseguro';
import axiosClient from '@lib/axios';
import { parseJSONResponse } from '@lib/utils';
import { OSAP_API_URL } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const getCoseguros = (agectaId: string) => {
  return `<?xml version="1.0" encoding="utf-8"?>
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
  <soapenv:Header/>
  <soapenv:Body>
     <tem:GetCoseguros>
        <tem:AgeCta_id>${agectaId}</tem:AgeCta_id>
     </tem:GetCoseguros>
  </soapenv:Body>
  </soapenv:Envelope>`;
};

const getCosegurosAfiliado = async (agectaId: string): Promise<Array<Coseguro>> => {
  try {
    const resp = await axiosClient.post(OSAP_API_URL, getCoseguros(agectaId), {
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://tempuri.org/IService1/GetCoseguros',
      },
    });
    const parsedResp = parseJSONResponse('GetCoseguros', resp.data);
    return parsedResp.Coseguros || [];
  } catch (err) {
    const errorMessage = (err as Error)?.message || err;
    const error = new Error(`Error calling webservice. ${errorMessage}`);
    throw error;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const session = await getSession({ req });

  if (session?.user) {
    const coseguros = await getCosegurosAfiliado(session.user.agentId);
    return res.status(200).json(coseguros);
  }
  return res.status(401).end();
};
