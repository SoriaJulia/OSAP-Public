import { NextRequest } from 'next/server';
import { NextApiRequest } from 'next';
import { AuthUserRoles } from 'types/enums';
import { nanoid } from 'nanoid';
import { SignJWT, jwtVerify } from 'jose';
import { JWT_SECRET_KEY, USER_TOKEN } from '@lib/constants';
import { jsonResponse } from './utils';

export async function verifyAuthMiddleware(request: NextRequest) {
  const token = request.cookies[USER_TOKEN];

  if (!token) {
    return jsonResponse(401, { error: { message: 'Missing user token' } });
  }

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET_KEY));
    return {
      ...verified.payload,
      username: verified.payload.username as string,
      password: verified.payload.password as string,
      role: verified.payload.password as AuthUserRoles,
    };
  } catch (err) {
    return jsonResponse(401, { error: { message: 'Your token has expired.' } });
  }
}
export async function verifyAuth(request: NextApiRequest) {
  const token = request.cookies[USER_TOKEN];

  if (!token) {
    return;
  }

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET_KEY));

    return {
      ...verified.payload,
      username: verified.payload.username as string,
      password: verified.payload.password as string,
      role: verified.payload.role as AuthUserRoles,
    };
  } catch (err) {
    return undefined;
  }
}
interface JWTUserPayload {
  username: string;
  password: string;
  role: AuthUserRoles;
}

export async function createUserToken(jwtPayload: JWTUserPayload) {
  const token = await new SignJWT({ ...jwtPayload })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('1w')
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));

  return token;
}
