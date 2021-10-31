const BASE_URL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://theProdUrl.com';

const BASE_WS = BASE_URL.replace(/^http/, 'ws');

export { BASE_URL, BASE_WS };
