import axios from 'axios';

const token = localStorage.getItem('token');
const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;