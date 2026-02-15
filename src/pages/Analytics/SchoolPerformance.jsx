import { useState } from 'react';
import { BarChart3, TrendingUp, Users, Building2, Globe, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const MOCK_SCHOOL_DATA = [
    { id: 1, name: 'Autoescuela Central', city: 'Madrid', students: 1250, passRate: 92, growth: 12.5, exams: 4500 },
    { id: 2, name: 'Ruta Segura', city: 'Barcelona', students: 840, passRate: 78, growth: -2.1, exams: 2100 },
    { id: 3, name: 'Conducción Pro', city: 'Valencia', students: 600, passRate: 85, growth: 8.4, exams: 1800 },
    { id: 4, name: 'Escuela Elite', city: 'Sevilla', students: 450, passRate: 94, growth: 15.2, exams: 1200 },
];

const SchoolCard = ({ school, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        style={{
            background: 'white', borderRadius: '24px', padding: '24px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '20px'
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0071e3' }}>
                    <Building2 size={24} />
                </div>
                <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1d1d1f', margin: 0 }}>{school.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#86868b', fontSize: '13px', marginTop: '2px' }}>
                        <Globe size={14} /> {school.city}
                    </div>
                </div>
            </div>
            <div style={{
                display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600,
                color: school.growth > 0 ? '#34c759' : '#ff3b30'
            }}>
                {school.growth > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {Math.abs(school.growth)}%
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: '#f5f5f7', padding: '16px', borderRadius: '16px' }}>
                <div style={{ fontSize: '12px', color: '#86868b', marginBottom: '4px' }}>Aprobación</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#1d1d1f' }}>{school.passRate}%</div>
            </div>
            <div style={{ background: '#f5f5f7', padding: '16px', borderRadius: '16px' }}>
                <div style={{ fontSize: '12px', color: '#86868b', marginBottom: '4px' }}>Estudiantes</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#1d1d1f' }}>{school.students}</div>
            </div>
        </div>

        <div style={{ width: '100%', height: '8px', background: '#f5f5f7', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${school.passRate}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                style={{ height: '100%', background: school.passRate > 80 ? '#34c759' : '#0071e3' }}
            />
        </div>
    </motion.div>
);

const SchoolPerformance = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';
    const isSuper = user?.role === 'superadmin';

    const filteredSchools = isAdmin
        ? MOCK_SCHOOL_DATA.filter(s => s.name === user.schoolName)
        : MOCK_SCHOOL_DATA;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>
                    {isAdmin ? 'Mi Rendimiento' : 'Rendimiento de Escuelas'}
                </h2>
                <p style={{ color: '#86868b', fontSize: '17px' }}>
                    {isAdmin ? `Viendo métricas de desempeño para ${user.schoolName}` : 'Comparativa de éxito y crecimiento por sede operativa.'}
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                {filteredSchools.map((school, idx) => (
                    <SchoolCard key={school.id} school={school} index={idx} />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                    marginTop: '40px', background: 'white', borderRadius: '24px', padding: '32px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.04)', overflow: 'hidden'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 600 }}>{isAdmin ? 'Histórico de Exámenes' : 'Ranking de Exámenes'}</h3>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0071e3', cursor: 'pointer' }}>Exportar Datos</div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', background: '#fafafa', fontSize: '12px', color: '#86868b' }}>
                                <th style={{ padding: '16px 24px', fontWeight: 600 }}>ESCUELA</th>
                                <th style={{ padding: '16px 24px', fontWeight: 600 }}>EXÁMENES REALIZADOS</th>
                                <th style={{ padding: '16px 24px', fontWeight: 600 }}>TASA DE ÉXITO</th>
                                <th style={{ padding: '16px 24px', fontWeight: 600 }}>CAPACIDAD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSchools.sort((a, b) => b.exams - a.exams).map(school => (
                                <tr key={school.id} style={{ borderBottom: '1px solid #f5f5f7' }}>
                                    <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{school.name}</td>
                                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#1d1d1f' }}>{school.exams.toLocaleString()}</td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '60px', height: '6px', background: '#f5f5f7', borderRadius: '3px' }}>
                                                <div style={{ width: `${school.passRate}%`, height: '100%', background: '#0071e3', borderRadius: '3px' }} />
                                            </div>
                                            <span style={{ fontSize: '14px', fontWeight: 600 }}>{school.passRate}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ fontSize: '14px', fontWeight: 500 }}>{school.students} alumnos</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default SchoolPerformance;
