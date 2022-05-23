import OSAPUser from '@appTypes/user';
import { JWT_SECRET_KEY } from '@lib/constants';
import { getAfiliado } from '@services/user';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthUserRoles } from 'types/enums';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'role', type: 'text' },
      },
      async authorize(credentials, req): Promise<OSAPUser | null> {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials) {
          return null;
        }

        try {
          const afiliado = await getAfiliado({
            username: credentials.username,
            password: credentials.password,
            role: credentials.role as AuthUserRoles,
          });
          if (afiliado.message) {
            // Any object returned will be saved in `user` property of the JWT
            throw afiliado.message;
            // return null;
          }
          return afiliado;
        } catch (err) {
          if (typeof err === 'string') {
            throw new Error(err);
          }
          throw new Error('Error interno del servidor');
        }
        // If you return null then an error will be displayed advising the user to check their details.
      },
    }),
  ],
  secret: JWT_SECRET_KEY,
  callbacks: {
    async session({ session, token }) {
      // eslint-disable-next-line no-param-reassign
      session.user = token.user;
      return session;
    },
    async jwt(params) {
      const { token, user } = params;
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/', // Error code passed in query string as ?error=
  },
});
