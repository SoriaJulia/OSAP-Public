/* eslint-disable @typescript-eslint/no-empty-interface */
import { UserRoles } from '@appTypes/enums/index';
import NextAuth from 'next-auth';
import OSAPUser from '@appTypes/user';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: OSAPUser;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: OSAPUser;
  }
}

declare module 'next-auth/core/types' {
  interface User {
    role: UserRoles;
    name: string;
    message: string;
    agentId: string;
  }
}
