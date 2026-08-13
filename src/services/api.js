import axios from 'axios';

const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL;
  if (!url || url === '/api') {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      url = 'https://prime-store-erp-backend.onrender.com/api';
    } else {
      url = '/api';
    }
  }
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  return url;
};

const baseURL = getBaseURL();
console.log(`[API Config] Axios Base URL: ${baseURL}`);

const API = axios.create({
  baseURL,
  withCredentials: true
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
