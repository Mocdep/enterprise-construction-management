import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
});
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  },
  error => Promise.reject(error)
);

export default request;