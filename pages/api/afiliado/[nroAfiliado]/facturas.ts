import { Factura } from '@appTypes/factura';
import axiosClient from '@lib/axios';
import { parseJSONResponse } from '@lib/utils';
import { OSAP_API_URL } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const action = (agectaID: string) => {
  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
  <soapenv:Header/>
  <soapenv:Body>
     <tem:GetFacturas>
        <!--Optional:-->
        <tem:AgeCta_id>${agectaID}</tem:AgeCta_id>
     </tem:GetFacturas>
  </soapenv:Body>
  </soapenv:Envelope>`;
};

const getFacturasAfiliado = async (agectaID: string): Promise<Array<Factura>> => {
  try {
    const resp = await axiosClient.post(OSAP_API_URL, action(agectaID), {
      headers: { 'Content-Type': 'text/xml;charset=UTF-8', 'SOAPAction': 'http://tempuri.org/IService1/GetFacturas' },
    });
    const parsedResp = parseJSONResponse('GetFacturas', resp.data);
    return parsedResp.Facturas || [];
  } catch (err) {
    const errorMessage = (err as Error)?.message || err;
    const error = new Error(`Error calling webservice. ${errorMessage}`);
    throw error;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const session = await getSession({ req });

  // if (!session) {
  //   return res.status(401).end();
  // }
  if (session?.user) {
    const facturas = await getFacturasAfiliado(session.user.ageCtaId);
    return res.status(200).json(facturas);
  }
  // TODO handle errors
};
