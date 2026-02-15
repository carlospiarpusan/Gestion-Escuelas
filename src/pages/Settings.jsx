import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield, Palette, Globe, Save, LogOut } from 'lucide-react';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Mi Perfil', icon: User },
        { id: 'app', label: 'Aplicación', icon: Palette },
        { id: 'security', label: 'Seguridad', icon: Shield },
        { id: 'notifications', label: 'Notificaciones', icon: Bell }
    ];

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Configuración</h1>
                <p style={{ color: '#86868b', fontSize: '17px' }}>Administra tu cuenta y preferencias del sistema.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '40px' }}>
                {/* Sidebar Tabs */}
                <aside style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '12px 16px', borderRadius: '12px', border: 'none',
                                background: activeTab === tab.id ? '#1d1d1f' : 'transparent',
                                color: activeTab === tab.id ? 'white' : '#1d1d1f',
                                fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                                transition: 'all 0.2s', textAlign: 'left'
                            }}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </aside>

                {/* Content Area */}
                <main style={{ background: 'white', padding: '40px', borderRadius: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                    {activeTab === 'profile' && (
                        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 700, color: '#86868b' }}>
                                    {user?.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1d1d1f', marginBottom: '4px' }}>{user?.name}</h3>
                                    <p style={{ color: '#86868b', fontSize: '14px' }}>{user?.role.toUpperCase()} • {user?.schoolName}</p>
                                    <button style={{ background: 'none', border: 'none', color: '#0071e3', fontWeight: 600, fontSize: '13px', cursor: 'pointer', marginTop: '4px' }}>Cambiar foto</button>
                                </div>
                            </div>

                            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <Input label="Nombre de Usuario" value={user?.name} />
                                    <Input label="Correo Electrónico" value={user?.email} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <Input label="Idioma" value="Español (Colombia)" />
                                    <Input label="Zona Horaria" value="GMT-5" />
                                </div>
                                <hr style={{ border: 'none', borderTop: '1px solid #f5f5f7', margin: '8px 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                    <Button variant="secondary">Cancelar</Button>
                                    <Button><Save size={18} /> Guardar Cambios</Button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {activeTab !== 'profile' && (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: '#86868b' }}>
                            <Settings size={40} style={{ margin: '0 auto 16px', opacity: 0.2 }} />
                            <p>Esta sección está en desarrollo.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default SettingsPage;
