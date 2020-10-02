import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.9.1.65:3333',
});

export default api;
