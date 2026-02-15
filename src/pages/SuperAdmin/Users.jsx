import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, Search, Shield, Globe, School, MoreVertical, Edit2, Trash2, Mail, Phone, Calendar } from 'lucide-react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

const MOCK_GLOBAL_USERS = [
    { id: 1, name: 'Carlos Admin', email: 'admin@school.com', role: 'admin', schoolId: 'school-1', schoolName: 'Autoescuela Central', status: 'Active', registered: '2024-12-10' },
    { id: 2, name: 'Secretaria General', email: 'sec@school.com', role: 'secretary', schoolId: 'school-1', schoolName: 'Autoescuela Central', status: 'Active', registered: '2025-01-15' },
    { id: 3, name: 'Juan Instructor', email: 'inst@school.com', role: 'instructor', schoolId: 'school-1', schoolName: 'Autoescuela Central', status: 'Active', registered: '2025-01-20' },
    { id: 4, name: 'Mario Rossi', email: 'mario@global.com', role: 'superadmin', schoolId: null, schoolName: 'Global', status: 'Active', registered: '2024-01-01' },
];

const UsersPage = () => {
    const [users, setUsers] = useState(MOCK_GLOBAL_USERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.schoolName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Usuarios Globales</h1>
                    <p style={{ color: '#86868b', fontSize: '17px' }}>Administra el acceso de administradores, secretarias e instructores.</p>
                </div>
                <Button onClick={() => setIsNewModalOpen(true)}>
                    <UserPlus size={18} /> Nuevo Usuario
                </Button>
            </header>

            {/* Stats Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
                {[
                    { label: 'Total Usuarios', value: users.length, icon: Users, color: '#0071e3' },
                    { label: 'Administradores', value: users.filter(u => u.role === 'admin').length, icon: Shield, color: '#AF52DE' },
                    { label: 'Sedes Activas', value: '12', icon: School, color: '#34C759' }
                ].map((stat, i) => (
                    <div key={i} style={{ background: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: stat.color, marginBottom: '8px' }}>
                            <stat.icon size={20} />
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#86868b' }}>{stat.label}</span>
                        </div>
                        <div style={{ fontSize: '28px', fontWeight: 700, color: '#1d1d1f' }}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Search Bar */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '24px', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#86868b' }} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, correo o escuela..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%', padding: '12px 16px 12px 48px', borderRadius: '14px',
                            border: '1px solid #e5e5e5', background: '#f5f5f7', fontSize: '15px'
                        }}
                    />
                </div>
            </div>

            {/* Users Table */}
            <div style={{ background: 'white', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', background: '#fafafa', fontSize: '12px', color: '#86868b' }}>
                            <th style={{ padding: '16px 24px', fontWeight: 600 }}>USUARIO</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600 }}>ROL</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600 }}>SEDE / ESCUELA</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600 }}>ESTADO</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #f5f5f7' }}>
                                <td style={{ padding: '16px 24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86868b', fontWeight: 600 }}>
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{user.name}</div>
                                            <div style={{ fontSize: '12px', color: '#86868b' }}>{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '16px 24px' }}>
                                    <span style={{
                                        padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                                        background: user.role === 'superadmin' ? '#E3F2FD' : user.role === 'admin' ? '#EDE7F6' : '#F5F5F7',
                                        color: user.role === 'superadmin' ? '#1E88E5' : user.role === 'admin' ? '#673AB7' : '#616161'
                                    }}>
                                        {user.role}
                                    </span>
                                </td>
                                <td style={{ padding: '16px 24px' }}>
                                    <div style={{ fontSize: '14px', color: '#1d1d1f' }}>{user.schoolName}</div>
                                    {user.schoolId && <div style={{ fontSize: '11px', color: '#86868b' }}>ID: {user.schoolId}</div>}
                                </td>
                                <td style={{ padding: '16px 24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#34C759', fontWeight: 500 }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34C759' }}></div>
                                        {user.status}
                                    </div>
                                </td>
                                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                    <button style={{ padding: '8px', background: 'none', border: 'none', color: '#86868b', cursor: 'pointer' }}>
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersPage;
