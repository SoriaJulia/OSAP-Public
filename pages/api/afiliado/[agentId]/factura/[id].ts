import axiosClient from '@lib/axios';
import { parseJSONResponse, ParseSOAPOptions, parseSOAPResponse } from '@lib/utils';
import { GECROS_API_URL, OSAP_API_URL } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const getFile = (id: string) => {
  return `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
    <soap:Header/>
    <soap:Body>
       <tem:ReporteCuentaCorriente>
          <tem:pCompId>${id}</tem:pCompId>
       </tem:ReporteCuentaCorriente>
    </soap:Body>
 </soap:Envelope>`;
};
const getFacturaById = async (id: string): Promise<string> => {
  try {
    const resp = await axiosClient.post(GECROS_API_URL, getFile(id), {
      headers: {
        SOAPAction: 'ReporteCuentaCorriente',
      },
    });
    const options: ParseSOAPOptions = {
      actionName: 'ReporteCuentaCorriente',
      resultName: 'Reporte',
      rootResultName: 'ReporteCuentaCorriente',
    };
    const parsedResp = parseSOAPResponse(resp.data, options);
    return parsedResp || '';
  } catch (err) {
    const errorMessage = (err as Error)?.message || err;
    const error = new Error(`Error calling webservice. ${errorMessage}`);
    throw error;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const session = await getSession({ req });
  const compId = req.query.id as string;
  const file = await getFacturaById(compId);

  if (session?.user) {
    return res.status(200).json({ data: file });
  }
  return res.status(401).end();
};
