import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => api.post('/register', data);
export const loginUser = (data) => api.post('/login', data);
export const saveData = (data) => api.post('/save', { data });
export const readData = () => api.get('/read');