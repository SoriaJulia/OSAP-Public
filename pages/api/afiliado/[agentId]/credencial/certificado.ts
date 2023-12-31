import { transporter } from '@lib/mailer';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import { readFileSync } from 'fs';
import { SERVER_ERROR } from '@lib/constants';

import { getServerSession } from 'next-auth';
import { nextAuthOptions } from 'pages/api/auth/[...nextauth]';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, nextAuthOptions);
  res.statusMessage = SERVER_ERROR;
  const fData = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
    const form = new IncomingForm({
      multiples: false,
    });
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).end();
      }
      resolve({ fields, files });
    });
  });

  const file = fData.files?.certificado;
  const fileContent = readFileSync(file.filepath);
  const { nombre, nroAfiliado, nroDoc, mensaje, email } = fData.fields;

  const mailData = {
    from: 'contacto@osap.com.ar',
    to: process.env.MAIL_CERTIFICADOS,
    subject: `Certificado de estudio - ${session?.user?.name} `,
    html: `
    <p>Agente de cuenta: ${session?.user?.agentId}</p>
    </br>
    <p>${email}</p>
    <p>Certificado de: ${nombre}, Documento: ${nroDoc}, Numero de Afiliado: ${nroAfiliado}</p>
    ${mensaje ? `<i>Mensaje: ${mensaje}</i>` : ''}`,
    attachments: [{ filename: file.originalFilename, content: fileContent }],
  };

  try {
    const result = await transporter.sendMail(mailData);
    if (result.accepted.length > 0) {
      return res.status(200).json({});
    }
  } catch (err) {
    return res.status(500).end();
  }
  return res.status(500).end();
}
