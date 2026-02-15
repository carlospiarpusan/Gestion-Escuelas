import axios from 'axios';
import { API_URL } from '../config/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

// Auth
export const authAPI = {
    login: (email: string, password: string) =>
        api.post('/auth/login', { email, password }),
    getMe: () => api.get('/auth/me'),
};

// Escuelas
export const escuelasAPI = {
    getAll: () => api.get('/escuelas'),
    create: (data: any) => api.post('/escuelas', data),
    update: (id: string, data: any) => api.put(`/escuelas/${id}`, data),
    delete: (id: string) => api.delete(`/escuelas/${id}`),
};

// Usuarios
export const usersAPI = {
    getAll: () => api.get('/users'),
    create: (data: any) => api.post('/users', data),
    update: (id: string, data: any) => api.put(`/users/${id}`, data),
    delete: (id: string) => api.delete(`/users/${id}`),
};

// Registros de horas
export const registrosAPI = {
    getAll: () => api.get('/registros'),
    create: (data: any) => api.post('/registros', data),
    aprobar: (id: string) => api.put(`/registros/${id}/aprobar`),
};

// Pagos
export const pagosAPI = {
    getAll: () => api.get('/pagos'),
    create: (data: any) => api.post('/pagos', data),
    update: (id: string, data: any) => api.put(`/pagos/${id}`, data),
};


// Exámenes
export const examenesAPI = {
    getAll: () => api.get('/examenes'),
    create: (data: any) => api.post('/examenes', data),
};

// Vehículos
export const vehiculosAPI = {
    getAll: () => api.get('/vehiculos'),
    create: (data: any) => api.post('/vehiculos', data),
    update: (id: string, data: any) => api.put(`/vehiculos/${id}`, data),
    delete: (id: string) => api.delete(`/vehiculos/${id}`),
};
