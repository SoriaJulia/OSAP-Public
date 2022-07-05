import { UserRoles } from './enums';

type User = {
  role: UserRoles;
  name: string;
  message: string;
  agentId: string;
  dni: string;
};

export default User;
