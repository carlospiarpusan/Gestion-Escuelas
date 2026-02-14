import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// MOCK USERS FOR DEV - In production this comes from API/DB
const MOCK_DB_USERS = [
    { email: 'super@admin.com', password: '123', role: 'superadmin', name: 'Super Admin', schoolId: null },
    { email: 'admin@school.com', password: '123', role: 'admin', name: 'Admin Escuela', schoolId: 'school-1' },
    { email: 'sec@school.com', password: '123', role: 'secretary', name: 'Secretaria General', schoolId: 'school-1' },
    { email: 'inst@school.com', password: '123', role: 'instructor', name: 'Juan Instructor', schoolId: 'school-1' },
    { email: 'student@school.com', password: '123', role: 'student', name: 'Carlos Estudiante', schoolId: 'school-1' },
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage on mount
        const storedUser = localStorage.getItem('user_session');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock API Call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const foundUser = MOCK_DB_USERS.find(u => u.email === email && u.password === password);
                if (foundUser) {
                    const sessionUser = {
                        email: foundUser.email,
                        role: foundUser.role,
                        name: foundUser.name,
                        schoolId: foundUser.schoolId,
                        token: 'mock-jwt-token'
                    };
                    setUser(sessionUser);
                    localStorage.setItem('user_session', JSON.stringify(sessionUser));
                    resolve(sessionUser);
                } else {
                    reject(new Error('Credenciales inválidas'));
                }
            }, 800);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user_session');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
