import OSAPUser from '@appTypes/user';
import { ParseSOAPOptions, parseSOAPResponse } from '@lib/utils';
import axiosClient from '@lib/axios';
import { AuthUserRoles, UserRoles } from 'types/enums';
import { GECROS_API_URL } from 'config';

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

const consultarUsuario = (username: string, password: string): string => {
  return `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
  <soap:Header/>
  <soap:Body>
     <tem:ConsultarUsuario>
        <!--Optional:-->
        <tem:pUsuario>${username}</tem:pUsuario>
        <!--Optional:-->
        <tem:pClave>${password}</tem:pClave>
     </tem:ConsultarUsuario>
  </soap:Body>
</soap:Envelope>`;
};

const ACTION_NAME = 'ConsultarUsuario';
const RESULT_NAME = 'ConsultarUsuario';

type GetAfiliadoPayload = {
  username: string;
  password: string;
  role: AuthUserRoles;
};

// TODO move this to types folder. complete
type GCrossUser = {
  Mensaje: string;
  Nombre: string;
  agecta_id: string;
};

const converter = {
  toOSAPUser: (xmlUser: GCrossUser, role: AuthUserRoles): OSAPUser => {
    const user: OSAPUser = {
      message: xmlUser.Mensaje,
      name: xmlUser.Nombre,
      role,
      agentId: xmlUser.agecta_id,
    };
    return user;
  },
};

export const getAfiliado = async ({ role, username, password }: GetAfiliadoPayload): Promise<OSAPUser> => {
  const action = role === UserRoles.AFILIADO ? consultarUsuario : consultarPrestador;
  try {
    const resp = await axiosClient.post(GECROS_API_URL, action(username, password), {
      headers: { SOAPAction: ACTION_NAME },
    });
    const options: ParseSOAPOptions = {
      actionName: ACTION_NAME,
      resultName: RESULT_NAME,
    };
    const parsedResp = parseSOAPResponse(resp.data, options);
    return converter.toOSAPUser(parsedResp, role);
  } catch (err) {
    const errorMessage = (err as Error)?.message || err;
    const error = new Error(`Error calling webservice. ${errorMessage}`);
    console.error(error);
    throw error;
  }
};
