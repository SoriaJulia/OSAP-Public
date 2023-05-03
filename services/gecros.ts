import OSAPUser from '@appTypes/user';
import { getUser } from '@services/user';
import { ServiceResponse } from '@appTypes/gecros';
import { Credentials } from 'pages/api/auth/[...nextauth]';
import { getAgente } from './agente';

export const GECROSService = {
  async login(credentials: Credentials): Promise<ServiceResponse<OSAPUser>> {
    const response: ServiceResponse<OSAPUser> = { data: null, message: '' };

    const { data: usuario, message: usuarioMsg } = await getUser(credentials);
    console.log('get user', usuario);

    if (!usuario) {
      response.message = usuarioMsg;
      return response;
    }

    response.data = {
      id: usuario.agecta_id,
      name: usuario.Nombre,
      agentId: usuario.agecta_id.toString(),
      role: credentials.role,
      dni: credentials.username,
      proveedorId: usuario.Prov_Cod,
      message: usuario.Mensaje,
    };

    if (response.data.agentId !== '0') {
      const { data: agente, message: agenteMsg } = await getAgente(credentials.username);
      console.log('get agente ', agente);
      response.data.convenio = agente?.convenio;
      if (!agente) {
        response.message = agenteMsg;
        return response;
      }
    }

    return response;
  },
};
