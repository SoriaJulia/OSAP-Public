import { Prestador, PrestadorXLocalidad } from '@appTypes/prestador';

export const getPrestadoresporLocalidad = (prestadores: Prestador[]) => {
  const result = prestadores.reduce((prestadoresXLocalidad: PrestadorXLocalidad, prestador) => {
    if (
      prestador.nombre === 'Sin definir' ||
      !prestador.nombre ||
      !prestador.idLocalidad ||
      prestador.Especialidades === 'Sin definir'
    )
      return prestadoresXLocalidad;
    if (!prestadoresXLocalidad[prestador.idLocalidad]) {
      // eslint-disable-next-line no-param-reassign
      prestadoresXLocalidad[prestador.idLocalidad] = [prestador];
    } else {
      prestadoresXLocalidad[prestador.idLocalidad].push(prestador);
    }

    return prestadoresXLocalidad;
  }, {});

  return result;
};
