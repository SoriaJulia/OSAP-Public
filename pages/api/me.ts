// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { verifyAuth } from '@lib/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAfiliado } from 'services/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // check if cookie, then validate and decrypt jwt to look for user.
  try {
    const tokenPayload = await verifyAuth(req);
    // console.log(tokenPayload);
    if (tokenPayload) {
      // make soap call to server. then return full user
      const { username, password, role } = tokenPayload;
      const result = await getAfiliado({ username, password, role });
      res.status(200).json(result);
    } else {
      res.status(204).end();
    }
  } catch (err) {
    res.status(500).json({ message: 'Interal server error' });
  }
}
