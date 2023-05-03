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

  const { seleccionados, mensaje, email, agentId } = fData.fields;

  const mailOsap = {
    from: 'contacto@osap.com.ar',
    to: process.env.MAIL_BAJA,
    subject: `Solicitud de Baja`,
    html: `
    <p>Agente de cuenta: ${agentId}</p>
    </br>
    <p>Mail de contacto: ${email}</p>
    <p>Usuario/s a dar de baja: ${seleccionados}</p>
    ${mensaje ? `<i>Motivo: ${mensaje}</i>` : ''}`,
  };
  const mailAfiliado = {
    from: process.env.MAIL_BAJA,
    to: email,
    subject: 'OSAP - Solicitud de baja',
    html: `<div style="color:#313335; background-color: #f8f8fc; padding: 16px; border-radius: 4px;">
    <h1 style="color:#216275">¡Hola! Recibimos tu solicitud de baja</h1>
    </br>
    <p>En los próximos dias vamos a revisar el estado de tu cuenta e informarte los avances del
    proceso</p>
    </br>
    <p>Saludos cordiales</p>
    <b style="color:#e62e00; font-size:24px; font-stretch: condensed">OSAP</b>
    </br>
    </div>`,
  };

  try {
    const result = await transporter.sendMail(mailOsap);
    const resultAfiliado = await transporter.sendMail(mailAfiliado);
    if (result.accepted.length > 0 && resultAfiliado.accepted.length > 0) {
      return res.status(200).json({});
    }
  } catch (err) {
    return res.status(500).end();
  }
  return res.status(500).end();
}
