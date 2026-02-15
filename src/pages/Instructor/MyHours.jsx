import { useState } from 'react';
import { Clock, Calendar, MapPin, User, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_CLASSES = [
    { id: 1, time: '08:00 - 10:00', student: 'Ana García', type: 'Práctica', status: 'Completada', location: 'Circuito Norte' },
    { id: 2, time: '10:30 - 12:30', student: 'Carlos Pérez', type: 'Práctica', status: 'En Progreso', location: 'Centro ciudad' },
    { id: 3, time: '14:00 - 16:00', student: 'María Rodríguez', type: 'Teoría', status: 'Pendiente', location: 'Aula 2' },
];

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ padding: '12px', borderRadius: '12px', background: `${color}15`, color: color }}>
            <Icon size={24} />
        </div>
        <div>
            <div style={{ fontSize: '14px', color: '#86868b' }}>{label}</div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1d1d1f' }}>{value}</div>
        </div>
    </div>
);

const MyHours = () => {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1d1d1f' }}>Mis Horas</h1>
                <p style={{ color: '#86868b', fontSize: '16px' }}>Resumen de tu actividad diaria y clases programadas.</p>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <StatCard icon={Clock} label="Horas Hoy" value="6h" color="#0071e3" />
                <StatCard icon={Calendar} label="Clases Semana" value="24" color="#34C759" />
                <StatCard icon={User} label="Estudiantes Activos" value="12" color="#F57C00" />
            </div>

            {/* Timeline View */}
            <div style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: '#1d1d1f' }}>Agenda de Hoy</h2>

                <div style={{ position: 'relative' }}>
                    {/* Vertical Line */}
                    <div style={{ position: 'absolute', left: '24px', top: '20px', bottom: '20px', width: '2px', background: '#f5f5f7' }}></div>

                    {MOCK_CLASSES.map((cls, index) => (
                        <motion.div
                            key={cls.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{ display: 'flex', gap: '20px', marginBottom: '32px', position: 'relative' }}
                        >
                            {/* Time Status Widget */}
                            <div style={{
                                width: '50px', height: '50px', borderRadius: '16px',
                                background: cls.status === 'Completada' ? '#E8F5E9' : cls.status === 'En Progreso' ? '#E3F2FD' : '#F5F5F7',
                                color: cls.status === 'Completada' ? '#2E7D32' : cls.status === 'En Progreso' ? '#0071e3' : '#86868b',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
                                border: '4px solid white'
                            }}>
                                {cls.status === 'Completada' ? <CheckCircle size={20} /> : <Clock size={20} />}
                            </div>

                            {/* Content Card */}
                            <div style={{ flex: 1, background: '#fbfbfd', borderRadius: '16px', padding: '20px', border: '1px solid #f5f5f7' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'flex-start' }}>
                                    <div>
                                        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1d1d1f', margin: 0 }}>{cls.student}</h3>
                                        <div style={{ color: '#0071e3', fontSize: '14px', fontWeight: 500, marginTop: '4px' }}>{cls.type}</div>
                                    </div>
                                    <span style={{
                                        padding: '6px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 600,
                                        background: cls.status === 'Completada' ? '#E8F5E9' : cls.status === 'En Progreso' ? '#E3F2FD' : '#fff',
                                        color: cls.status === 'Completada' ? '#2E7D32' : cls.status === 'En Progreso' ? '#0071e3' : '#86868b',
                                        border: cls.status === 'Pendiente' ? '1px solid #e5e5e5' : 'none'
                                    }}>
                                        {cls.status}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#6e6e73' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Clock size={16} /> {cls.time}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <MapPin size={16} /> {cls.location}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyHours;
