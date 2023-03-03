import axios from 'axios';
import { env } from '@/next.config';

axios.defaults.baseURL = env.APP_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

export { axios };