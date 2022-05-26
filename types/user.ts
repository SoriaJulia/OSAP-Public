import { UserRoles } from './enums';

type User = {
  role: UserRoles;
  name: string;
  message: string;
  ageCtaId: string;
};

export default User;
