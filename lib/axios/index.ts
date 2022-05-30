// eslint-disable-next-line import/no-self-import
import axios from 'axios';
import { SERVER_BASE_URL } from '../../config';

const axiosClient = axios.create({
  headers: { 'Content-Type': 'application/soap+xml' },
});

export default axiosClient;
