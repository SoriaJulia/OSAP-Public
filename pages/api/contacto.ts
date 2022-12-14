import { transporter } from '@lib/mailer';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};
type FormRequest = {
  nombre?: string;
  asunto?: string;
  telefono?: string;
  email?: string;
  mensaje?: string;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const formData = await new Promise<{ fields: FormRequest }>((resolve) => {
    const form = new IncomingForm({
      multiples: false,
    });
    form.parse(req, (err, fields) => {
      if (err) {
        return res.status(500).end();
      }
      resolve({ fields });
    });
  });
  const { telefono, asunto, nombre, email, mensaje } = formData.fields;
  const mailData = {
    from: 'contacto@osap.com.ar',
    to: process.env.MAIL_CONTACTO,
    subject: `${asunto} `,
    html: `
    <p>Nombre:${nombre} </p>
    <p>Email: ${email}</p>
    ${telefono ? `<p>Telefono: ${telefono}</p>` : ''}
    <p>Mensaje: ${mensaje}`,
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
