import { transporter } from '@lib/mailer';
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import { SERVER_ERROR } from '@lib/constants';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

  const { calle, numero, piso, depto, localidad, email, celular, telefono, nombre } = fData.fields;

  const mailData = {
    from: 'contacto@osap.com.ar',
    to: process.env.MAIL_PRESTADORES,
    subject: `Actualizacion datos cartilla - ${nombre} `,
    html: `
    <h2>Domicilio </h2>
    <p> ${calle} ${numero}, piso: ${piso}, depto: ${depto}. ${localidad}</p>
    </br>
    <h2>Contacto</h2>
    <p>email:${email}, Telefono: ${telefono}, Celular:${celular}</p>
    </br>`,
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
