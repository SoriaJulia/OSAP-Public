import { Factura } from '@appTypes/factura';
import axiosClient from '@lib/axios';
import { parseJSONResponse } from '@lib/utils';
import { OSAP_API_URL } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import _, { parseInt } from 'lodash';

const action = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
<soapenv:Header/>
<soapenv:Body>
   <tem:GetFacturas>
      <!--Optional:-->
      <tem:AgeCta_id>800888</tem:AgeCta_id>
   </tem:GetFacturas>
</soapenv:Body>
</soapenv:Envelope>`;

const getFacturasAfiliado = async (agectaID: string): Promise<Array<Factura>> => {
  try {
    const resp = await axiosClient.post(OSAP_API_URL, action, {
      headers: { 'Content-Type': 'text/xml;charset=UTF-8', 'SOAPAction': 'http://tempuri.org/IService1/GetFacturas' },
    });
    const parsedResp = parseJSONResponse('GetFacturas', resp.data);
    return parsedResp.Facturas || [];
  } catch (err) {
    const errorMessage = (err as Error)?.message || err;
    const error = new Error(`Error calling webservice. ${errorMessage}`);
    console.error(error);
    throw error;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const session = await getSession({ req });
  // if (!session) {
  //   return res.status(401).end();
  // }

  const facturas = await getFacturasAfiliado('800888');
  const facturasXPeriodo = _.groupBy<Factura>(facturas, (factura) => factura.comp_peri);
  return res.status(200).json(facturasXPeriodo);
};
