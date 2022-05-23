import { UserRoles } from './enums';

type User = {
  role: UserRoles;
  name: string;
  message: string;
};

export default User;
