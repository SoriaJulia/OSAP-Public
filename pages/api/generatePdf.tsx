import PrestadoresPdf from '@components/Cartilla/PrestadoresPdf';
import { getPrestadoresporLocalidad } from '@lib/cartilla';
import { renderToStream, Document } from '@react-pdf/renderer';
import { getCartillaPrestadores, getLocalidades } from '@services/cartilla';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  pdf: NodeJS.ReadableStream;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { tipo, especialidad, localidad, subtitulo } = req.query;
  const nombre = typeof req.query.nombre !== 'string' ? '' : req.query.nombre;
  if (
    typeof tipo !== 'string' ||
    typeof especialidad !== 'string' ||
    typeof localidad !== 'string' ||
    typeof subtitulo !== 'string'
  )
    return res.status(400);
  const { data: localidades } = await getLocalidades();
  const { data: prestadores } = await getCartillaPrestadores(nombre, tipo, especialidad, localidad);

  const prestadoresXLoc = getPrestadoresporLocalidad(prestadores || []);
  const MyDocument = () => (
    <Document>
      <PrestadoresPdf prestadoresXLoc={prestadoresXLoc} subtitulo={subtitulo} localidades={localidades || []} />
    </Document>
  );
  const stream = await renderToStream(<MyDocument />);

  res.status(200);
  stream.pipe(res);
}
