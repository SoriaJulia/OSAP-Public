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
  const fData = await new Promise<{ fields: any; files: any }>((resolve) => {
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

  const file = fData.files?.comprobante;
  const fileContent = readFileSync(file.filepath);
  const { email, comentario, facturas, importe } = fData.fields;
  const mailData = {
    from: 'contacto@osap.com.ar',
    to: process.env.MAIL_INFORMAR_PAGO,
    subject: `Informe de pago - ${session?.user?.name} `,
    html: `
    <p>Agente de cuenta: ${session?.user?.agentId}, DNI: ${session?.user?.dni}</p>
    <p>Email: ${email} <p/>
    <p>Facturas: ${facturas}</p>
    <p>Importe: ${importe}</p>
    <p>Comentario: ${comentario}`,
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
