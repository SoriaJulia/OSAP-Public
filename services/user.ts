import OSAPUser from '@appTypes/user';
import { parseSOAPResponse } from '@lib/utils';
import axiosClient from '@lib/axios';
import { AuthUserRoles, UserRoles } from 'types/enums';

const consultarAfiliado = (username: string, password: string): string => {
  return `<?xml version="1.0" encoding="utf-8"?>
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
      <ConsultarAfiliado xmlns="http://tempuri.org/">
        <pUsuario>${username}</pUsuario>
        <pClave>${password}</pClave>
        <pXml>&lt;Afiliado&gt;&lt;TipoDoc&gt;2&lt;/TipoDoc&gt;&lt;NroDoc&gt;${username}&lt;/NroDoc&gt;&lt;NumeroAfiliado&gt;&lt;/NumeroAfiliado&gt;&lt;Fecha&gt;12/04/2022&lt;/Fecha&gt;&lt;/Afiliado&gt;</pXml>
      </ConsultarAfiliado>
    </soap12:Body>
  </soap12:Envelope>`;
};

const consultarPrestador = (username: string, password: string): string => {
  return `<?xml version="1.0" encoding="utf-8"?>
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
      <ConsultarAfiliado xmlns="http://tempuri.org/">
        <pUsuario>${username}</pUsuario>
        <pClave>${password}</pClave>
        <pXml>&lt;Afiliado&gt;&lt;TipoDoc&gt;2&lt;/TipoDoc&gt;&lt;NroDoc&gt;${username}&lt;/NroDoc&gt;&lt;NumeroAfiliado&gt;&lt;/NumeroAfiliado&gt;&lt;Fecha&gt;12/04/2022&lt;/Fecha&gt;&lt;/Afiliado&gt;</pXml>
      </ConsultarAfiliado>
    </soap12:Body>
  </soap12:Envelope>`;
};

const ACTION_NAME = 'ConsultarAfiliado';
const RESULT_NAME = 'ConsultaAfiliado';

type GetAfiliadoPayload = {
  username: string;
  password: string;
  role: AuthUserRoles;
};

// TODO move this to types folder. complete
type GCrossUser = {
  Mensaje: string;
  Afiliado: string;
};

const converter = {
  toOSAPUser: (xmlUser: GCrossUser, role: AuthUserRoles): OSAPUser => {
    const user: OSAPUser = {
      message: xmlUser.Mensaje,
      name: xmlUser.Afiliado,
      role,
    };
    return user;
  },
};

export const getAfiliado = async ({ role, username, password }: GetAfiliadoPayload): Promise<OSAPUser> => {
  const action = role === UserRoles.AFILIADO ? consultarAfiliado : consultarPrestador;
  try {
    const resp = await axiosClient.post('', action(username, password), {
      headers: { SOAPAction: ACTION_NAME },
    });
    const parsedResp = parseSOAPResponse(ACTION_NAME, RESULT_NAME, resp.data);
    return converter.toOSAPUser(parsedResp, role);
  } catch (err) {
    const errorMessage = (err as Error)?.message || err;
    const error = new Error(`Error calling webservice. ${errorMessage}`);
    console.error(error);
    throw error;
  }
};
