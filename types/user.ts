import { UserRoles } from './enums';

type User = {
  role: UserRoles;
  name: string;
  message: string;
  agentId: string;
};

export default User;
