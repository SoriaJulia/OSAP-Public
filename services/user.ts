import OSAPUser from '@appTypes/user';
import { ParseSOAPOptions, parseSOAPResponse } from '@lib/utils';
import axiosClient from '@lib/axios';
import { AuthUserRoles } from 'types/enums';
import { GECROS_API_URL } from 'config';

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
  toOSAPUser: (xmlUser: GCrossUser, role: AuthUserRoles, dni: string): OSAPUser => {
    const user: OSAPUser = {
      message: xmlUser.Mensaje,
      name: xmlUser.Nombre,
      role,
      agentId: xmlUser.agecta_id,
      dni,
    };
    return user;
  },
};

export const getAfiliado = async ({ role, username, password }: GetAfiliadoPayload): Promise<OSAPUser> => {
  try {
    const userResp = await axiosClient.post(GECROS_API_URL, consultarUsuario(username, password), {
      headers: { SOAPAction: ACTION_NAME },
    });
    const userOptions: ParseSOAPOptions = {
      actionName: ACTION_NAME,
      resultName: RESULT_NAME,
    };
    const parsedUserResp = parseSOAPResponse(userResp.data, userOptions);
    return converter.toOSAPUser(parsedUserResp, role, username);
  } catch (err) {
    const errorMessage = (err as Error)?.message || err;
    const error = new Error(`Error calling webservice. ${errorMessage}`);
    console.error(error);
    throw error;
  }
};
