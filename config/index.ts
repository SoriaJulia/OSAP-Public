export const GECROS_API_URL =
  process.env.NEXT_PUBLIC_GECROS_API_URL ||
  process.env.GECROS_API_URL ||
  'http://190.228.161.157:81/wsgecrosnet/wsgecrosnet.asmx';
export const OSAP_API_URL =
  process.env.NEXT_PUBLIC_OSAP_API_URL || process.env.OSAP_API_URL || 'https://ws.osap.com.ar:444';
export const NEXT_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000/api';
