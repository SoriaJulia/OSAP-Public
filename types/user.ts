import { UserRoles } from './enums';

type User = {
  id: string;
  message: string;
  name: string;
  agentId: string;
  dni: string;
  role: UserRoles;
  convenio?: string;
  proveedorId?: string;
};

export default User;
