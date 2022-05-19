import { XMLParser, XMLValidator } from 'fast-xml-parser';

export function jsonResponse(status: number, data: any, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    status,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    },
  });
}

export const parseSOAPResponse = (actionName: string, resultName: string, xml: string) => {
  if (XMLValidator.validate(xml)) {
    const parser = new XMLParser();
    const jsonObj = parser.parse(xml);
    const result = jsonObj['soap:Envelope']['soap:Body'][`${actionName}Response`][`${actionName}Result`];
    const resultObj = parser.parse(result);
    return resultObj.DocumentElement[resultName];
  }
};
