/* eslint-disable consistent-return */
import type { NextFetchEvent, NextRequest } from 'next/server';
import { nanoid } from 'nanoid';
import { verifyAuth, verifyAuthMiddleware } from '@lib/auth';
import { jsonResponse } from '@lib/utils';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const url = req.nextUrl;

  const resOrPayload = await verifyAuthMiddleware(req);

  // TODO dont json response but call next so api call gets executed
  return resOrPayload instanceof Response ? resOrPayload : NextResponse.next();
  // jsonResponse(200, { nanoid: nanoid(), jwtID: resOrPayload.jti });
}
