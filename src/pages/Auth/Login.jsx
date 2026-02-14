import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Email o contraseña incorrectos.');
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#f5f5f7', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    background: 'white', padding: '48px', borderRadius: '24px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)', width: '100%', maxWidth: '420px'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '60px', height: '60px', background: '#000', borderRadius: '14px',
                        margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1d1d1f' }}>Bienvenido</h1>
                    <p style={{ color: '#86868b', marginTop: '8px' }}>Ingresa a tu cuenta para continuar</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                            style={{
                                background: '#FFF2F2', color: '#FF3B30', padding: '12px', borderRadius: '12px',
                                marginBottom: '24px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px'
                            }}
                        >
                            <AlertCircle size={16} /> {error}
                        </motion.div>
                    )}

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#86868b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#86868b' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                style={{
                                    width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px',
                                    border: '1px solid #d2d2d7', fontSize: '16px', background: '#fafafa', outline: 'none'
                                }}
                                placeholder="nombre@escuela.com"
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#86868b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contraseña</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: '#86868b' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                style={{
                                    width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px',
                                    border: '1px solid #d2d2d7', fontSize: '16px', background: '#fafafa', outline: 'none'
                                }}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%', padding: '16px', borderRadius: '14px', border: 'none',
                            background: isLoading ? '#999' : '#0071e3', color: 'white',
                            fontSize: '16px', fontWeight: 600, cursor: isLoading ? 'wait' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            transition: 'background 0.2s'
                        }}
                    >
                        {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
                        {!isLoading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div style={{ marginTop: '32px', textAlign: 'center' }}>
                    <p style={{ fontSize: '13px', color: '#86868b' }}>
                        ¿Olvidaste tu contraseña? <a href="#" style={{ color: '#0071e3', textDecoration: 'none' }}>Recuperar</a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
