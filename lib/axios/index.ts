// eslint-disable-next-line import/no-self-import
import axios from 'axios';

const axiosClient = axios.create({
  headers: { 'Content-Type': 'application/soap+xml' },
});

export default axiosClient;
