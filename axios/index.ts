import axios from 'axios';
import { SOAP_API_URL } from '../config';

const axiosClient = axios.create({
  baseURL: SOAP_API_URL,
  headers: { 'Content-Type': 'application/soap+xml' },
});

export default axiosClient;
