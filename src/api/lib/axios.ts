import axios from 'axios';

const MILLISECONDS = 10 * 1000;

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.responseType = 'json' as const;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = MILLISECONDS;

export default axios;
