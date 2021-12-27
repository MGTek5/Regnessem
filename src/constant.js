const BASE_URL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : process.env.REACT_APP_API_URL;

const BASE_WS = BASE_URL.replace(/^http/, 'ws');
const TENOR_API_BASE_URL = 'https://g.tenor.com/v1';
const TENOR_API_KEY = 'EEDC1C0HTAYG';

export {
  BASE_URL,
  BASE_WS,
  TENOR_API_KEY,
  TENOR_API_BASE_URL,
};
