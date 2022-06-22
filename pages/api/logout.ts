// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { USER_TOKEN } from '@lib/constants';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const userToken = req.cookies[USER_TOKEN];
  if (!userToken) {
    return res.status(200).json(null);
  }

  res.setHeader(
    'Set-Cookie',
    cookie.serialize(USER_TOKEN, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/',
      expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'),
    })
  );

  return res.status(200).json(null);
}
