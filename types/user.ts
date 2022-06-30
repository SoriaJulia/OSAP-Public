import { UserRoles } from './enums';

type User = {
  role: UserRoles;
  name: string;
  message: string;
  agentId: string;
  convenio: string;
};

export default User;
