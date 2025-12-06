import axios from 'axios';

const api = axios.create({
  baseURL: 'https://news-app-newsspace-caczgxddcsd6hfb8.southeastasia-01.azurewebsites.net', // Cập nhật URL backend mới
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
