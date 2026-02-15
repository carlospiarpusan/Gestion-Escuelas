export const API_URL = 'http://localhost:3000/api';
export const USE_API = true;
// Cambiar a true cuando la base de datos esté lista

export const getAuthHeader = () => {
    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};
