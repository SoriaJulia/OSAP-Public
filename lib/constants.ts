/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const USER_TOKEN = 'user-token';
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
export const SERVER_ERROR =
  'Hubo un error procesando su solicitud, por favor intente nuevamente. Si el error persiste contáctenos.';
export const NETWORK_ERROR =
  'Hubo un error al conectarse con el servidor. Revise su conexión a internet e intente nuevamente';
export const DEFAULT_CACHE_TIME = 8.64e7;
export const DEFAULT_STALE_TIME = 3.6e6;
