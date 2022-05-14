// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { USER_TOKEN } from '@lib/constants';
// import axiosClient from '../../axios';
import { createUserToken } from '@lib/auth';
import cookie from 'cookie';
import { getAfiliado } from 'services/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'Bad Request' });
    }

    // only do this if soap call is ok.
    // const userObject = {
    const user = await getAfiliado({ username, password, role });
    // }
    const userToken = req.cookies[USER_TOKEN];
    if (!userToken) {
      const token = await createUserToken({ username, password, role });
      res.setHeader(
        'Set-Cookie',
        cookie.serialize(USER_TOKEN, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/',
        })
      );
    }

    // return user object. define userObject
    return res.status(200).json(user);

    // res.status(200).json({ nanoid: nanoid(), jwtID: payload.jti });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}

// const resp = await axiosClient.post(
//   '',
//   consultarAfiliado(req.body.user, req.body.password),
//   {
//     headers: { SOAPAction: 'ConsultarAfiliado' },
//   }
// );
// if (resp.status === 200) {
//   if (XMLValidator.validate(resp.data)) {
//     const parser = new XMLParser();
//     const jsonObj = parser.parse(resp.data);
//     const result =
//       jsonObj['soap:Envelope']['soap:Body'].ConsultarAfiliadoResponse
//         .ConsultarAfiliadoResult;
//     const resultObj = parser.parse(result);
//     console.log(resultObj);
//     res.status(200).json(resultObj.DocumentElement.ConsultaAfiliado);
//   }
// }
