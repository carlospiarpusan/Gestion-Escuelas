import { createContext, useState, useEffect, useContext } from 'react';
import secureStorage from '../lib/secureStorage';

const AuthContext = createContext(null);

// MOCK USERS FOR DEV - In production this comes from API/DB
export const MOCK_DB_USERS = [
    { email: 'super@admin.com', password: '123', role: 'superadmin', name: 'Super Admin', schoolId: null, schoolName: 'Global' },
    { email: 'carlospt@live.com', password: 'Car.8902', role: 'superadmin', name: 'Carlos SuperAdmin', schoolId: null, schoolName: 'Global' },
    { email: 'admin@school.com', password: '123', role: 'admin', name: 'Admin Escuela', schoolId: 'school-1', schoolName: 'Autoescuela Central' },
    { email: 'sec@school.com', password: '123', role: 'secretary', name: 'Secretaria General', schoolId: 'school-1', schoolName: 'Autoescuela Central' },
    { email: 'inst@school.com', password: '123', role: 'instructor', name: 'Juan Instructor', schoolId: 'school-1', schoolName: 'Autoescuela Central' },
    { email: 'student@school.com', password: '123', role: 'student', name: 'Carlos Estudiante', schoolId: 'school-1', schoolName: 'Autoescuela Central' },
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check secureStorage on mount
        const storedUser = secureStorage.getItem('user_session');
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (res.ok) {
                const sessionUser = await res.json();
                setUser(sessionUser);
                secureStorage.setItem('user_session', sessionUser);
                return sessionUser;
            } else {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Credenciales inválidas');
            }
        } catch (err) {
            console.error('Login error:', err);
            // Fallback for dev if API is not available
            const foundUser = MOCK_DB_USERS.find(u => u.email === email && u.password === password);
            if (foundUser) {
                const sessionUser = {
                    email: foundUser.email,
                    role: foundUser.role,
                    name: foundUser.name,
                    schoolId: foundUser.schoolId,
                    schoolName: foundUser.schoolName,
                    token: 'mock-jwt-token'
                };
                setUser(sessionUser);
                secureStorage.setItem('user_session', sessionUser);
                return sessionUser;
            }
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        secureStorage.removeItem('user_session');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
