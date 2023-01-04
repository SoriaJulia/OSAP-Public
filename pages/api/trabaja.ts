import { transporter } from '@lib/mailer';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import { readFileSync } from 'fs';
import { SERVER_ERROR } from '@lib/constants';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
  let attachment;
  const { tipo, nombre, email, mensaje } = fData.fields;
  const mailTo = tipo === 'empleado' ? process.env.MAIL_EMPLEADOS : process.env.MAIL_PRESTADORES;
  const mailContent = {
    from: 'contacto@osap.com.ar',
    to: mailTo,
    subject: `Postulación para ${tipo}`,
    html: `
    <p>Nombre: ${nombre}</p>
    <p>Email: ${email}</p>
    <p>Mensaje: ${mensaje}</p>`,
  };
  if (fData.files.archivo) {
    const file = fData.files.archivo;
    const fileContent = readFileSync(file.filepath);
    attachment = [{ filename: file.originalFilename, content: fileContent }];
  }
  const mail = { ...mailContent, attachments: attachment };
  try {
    const result = await transporter.sendMail(mail);
    if (result.accepted.length > 0) {
      return res.status(200).json({});
    }
  } catch (err) {
    return res.status(500).end();
  }
  return res.status(500).end();
}
