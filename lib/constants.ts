/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const USER_TOKEN = 'user-token';
export const API_URL = process.env.PROD_API_URL || 'http://localhost:3000/api';
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
