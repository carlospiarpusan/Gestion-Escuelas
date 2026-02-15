import { useState } from 'react';
import { BarChart3, TrendingUp, Users, Award, Calendar, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const MOCK_RESULTS = [
    { id: 1, student: 'Ana Garcia', school: 'Autoescuela Central', category: 'B1', mode: 40, score: 38, passed: true, date: '2025-02-14' },
    { id: 2, student: 'Pedro Lopez', school: 'Ruta Segura', category: 'A2', mode: 15, score: 10, passed: false, date: '2025-02-14' },
    { id: 3, student: 'Maria Diaz', school: 'Autoescuela Central', category: 'B1', mode: 15, score: 15, passed: true, date: '2025-02-13' },
    { id: 4, student: 'Luis Torres', school: 'Conducción Pro', category: 'C1', mode: 40, score: 35, passed: true, date: '2025-02-12' },
    { id: 5, student: 'Julia Sanz', school: 'Autoescuela Central', category: 'B1', mode: 40, score: 40, passed: true, date: '2025-02-11' },
    { id: 6, student: 'Marcos Ruis', school: 'Ruta Segura', category: 'B1', mode: 15, score: 14, passed: true, date: '2025-02-10' },
];

const PieChart = ({ percentage, color = '#0071e3', size = 120 }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(percentage * circumference) / 100} ${circumference}`;

    return (
        <div style={{ position: 'relative', width: size, height: size }}>
            <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#f5f5f7" strokeWidth="10" />
                <motion.circle
                    cx="50" cy="50" r={radius} fill="transparent" stroke={color} strokeWidth="10"
                    strokeDasharray={strokeDasharray} strokeLinecap="round"
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    animate={{ strokeDasharray }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </svg>
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#1d1d1f' }}>{percentage}%</span>
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, subtext, color = '#0071e3' }) => (
    <div style={{ background: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', background: `${color}15`, color, borderRadius: '10px' }}>
                <Icon size={18} />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#86868b' }}>{label}</span>
        </div>
        <div style={{ fontSize: '28px', fontWeight: 700, color: '#1d1d1f', marginTop: '4px' }}>{value}</div>
        {subtext && <div style={{ fontSize: '13px', color: '#34c759', fontWeight: 500 }}>{subtext}</div>}
    </div>
);

const ExamResults = () => {
    const { user } = useAuth();
    const isSuper = user?.role === 'superadmin';
    const isAdmin = user?.role === 'admin';

    // If admin, lock the filter to their schoolName
    const [filterSchool, setFilterSchool] = useState(isAdmin ? user.schoolName : 'All');
    const [dateRange, setDateRange] = useState('Week');

    const filteredResults = filterSchool === 'All'
        ? MOCK_RESULTS
        : MOCK_RESULTS.filter(r => r.school === filterSchool);

    const totalExams = filteredResults.length;
    const passedExams = filteredResults.filter(r => r.passed).length;
    const passRate = totalExams > 0 ? Math.round((passedExams / totalExams) * 100) : 0;

    const topPerformers = [...filteredResults]
        .filter(r => r.passed)
        .sort((a, b) => (b.score / b.mode) - (a.score / a.mode))
        .slice(0, 3);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
            <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Analytics & Reports</h1>
                    <p style={{ color: '#86868b', fontSize: '17px' }}>
                        {isAdmin ? `Viendo datos exclusivos de ${user.schoolName}` : 'Visión detallada del rendimiento académico de la red.'}
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    {isSuper && (
                        <div style={{ position: 'relative' }}>
                            <select
                                value={filterSchool}
                                onChange={(e) => setFilterSchool(e.target.value)}
                                style={{
                                    padding: '10px 16px', borderRadius: '12px', border: '1px solid #e5e5e5',
                                    background: 'white', fontSize: '14px', fontWeight: 500, cursor: 'pointer', appearance: 'none',
                                    paddingRight: '40px'
                                }}
                            >
                                <option value="All">Todas las Escuelas</option>
                                <option value="Autoescuela Central">Autoescuela Central</option>
                                <option value="Ruta Segura">Ruta Segura</option>
                                <option value="Conducción Pro">Conducción Pro</option>
                            </select>
                            <ChevronRight size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%) rotate(90deg)', color: '#86868b', pointerEvents: 'none' }} />
                        </div>
                    )}

                    <div style={{ background: '#f5f5f7', padding: '4px', borderRadius: '14px', display: 'flex', gap: '2px' }}>
                        {['Day', 'Week', 'Month'].map(range => (
                            <button
                                key={range}
                                onClick={() => setDateRange(range)}
                                style={{
                                    border: 'none', background: dateRange === range ? 'white' : 'transparent',
                                    padding: '6px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                                    color: dateRange === range ? '#1d1d1f' : '#86868b', cursor: 'pointer',
                                    boxShadow: dateRange === range ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {range === 'Day' ? 'Hoy' : range === 'Week' ? 'Semana' : 'Mes'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
                <StatCard icon={BarChart3} label="Total Exámenes" value={totalExams} subtext="+12% vs anterior" />
                <StatCard icon={TrendingUp} label="Tasa Promedio" value={`${passRate}%`} subtext="+2.4% mejora" color="#34c759" />
                <StatCard icon={Users} label="Alumnos Únicos" value={isAdmin ? "124" : "482"} subtext="Nuevos este mes" color="#af52de" />
                <StatCard icon={Calendar} label="Pruebas Pendientes" value={isAdmin ? "32" : "124"} subtext="Próximas 48h" color="#ff9500" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '40px' }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Distribución de Aprobados</h3>
                            <p style={{ color: '#86868b', fontSize: '15px', marginBottom: '24px' }}>Balance general de resultados teóricos en el periodo seleccionado.</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#34c759' }}></div>
                                        <span style={{ fontSize: '14px', color: '#1d1d1f' }}>Aprobados</span>
                                    </div>
                                    <span style={{ fontSize: '14px', fontWeight: 600 }}>{passedExams}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#ff3b30' }}></div>
                                        <span style={{ fontSize: '14px', color: '#1d1d1f' }}>Reprobados</span>
                                    </div>
                                    <span style={{ fontSize: '14px', fontWeight: 600 }}>{totalExams - passedExams}</span>
                                </div>
                            </div>
                        </div>
                        <PieChart percentage={passRate} color={passRate > 80 ? '#34c759' : '#0071e3'} size={140} />
                    </div>

                    <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                        <div style={{ padding: '24px 32px', borderBottom: '1px solid #f5f5f7' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Resultados Recientes</h3>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', background: '#fafafa', fontSize: '12px', color: '#86868b' }}>
                                    <th style={{ padding: '16px 32px', fontWeight: 600 }}>ESTUDIANTE</th>
                                    <th style={{ padding: '16px 32px', fontWeight: 600 }}>ESCUELA</th>
                                    <th style={{ padding: '16px 32px', fontWeight: 600 }}>PUNTAJE</th>
                                    <th style={{ padding: '16px 32px', fontWeight: 600 }}>ESTADO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResults.slice(0, 5).map(res => (
                                    <tr key={res.id} style={{ borderBottom: '1px solid #f5f5f7' }}>
                                        <td style={{ padding: '16px 32px' }}>
                                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{res.student}</div>
                                            <div style={{ fontSize: '12px', color: '#86868b' }}>{res.category} • {res.mode} pregs</div>
                                        </td>
                                        <td style={{ padding: '16px 32px', fontSize: '14px', color: '#1d1d1f' }}>{res.school}</td>
                                        <td style={{ padding: '16px 32px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: 600 }}>{res.score}</span>
                                            <span style={{ fontSize: '13px', color: '#86868b' }}> / {res.mode}</span>
                                        </td>
                                        <td style={{ padding: '16px 32px' }}>
                                            <span style={{
                                                fontSize: '12px', padding: '4px 10px', borderRadius: '99px', fontWeight: 600,
                                                background: res.passed ? '#E8F5E9' : '#FFEBEE',
                                                color: res.passed ? '#2E7D32' : '#C62828'
                                            }}>
                                                {res.passed ? 'Aprobado' : 'Reprobado'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ background: '#1d1d1f', borderRadius: '24px', padding: '24px', color: 'white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <Award size={20} color="#ff9500" />
                            <h3 style={{ fontSize: '17px', fontWeight: 600 }}>Top Performers</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {topPerformers.map((performer, idx) => (
                                <div key={performer.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700
                                    }}>
                                        {idx + 1}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '14px', fontWeight: 500 }}>{performer.student}</div>
                                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Score: {performer.score}/{performer.mode}</div>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#ff9500', fontWeight: 600 }}>
                                        {Math.round((performer.score / performer.mode) * 100)}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}>Métricas por Categoría</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { label: 'Automóvil (B1)', value: 88, color: '#0071e3' },
                                { label: 'Motocicleta (A2)', value: 72, color: '#5e5ce6' },
                                { label: 'Carga (C1)', value: 95, color: '#34c759' },
                            ].map(cat => (
                                <div key={cat.label}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                                        <span style={{ color: '#1d1d1f', fontWeight: 500 }}>{cat.label}</span>
                                        <span style={{ color: '#86868b' }}>{cat.value}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', background: '#f5f5f7', borderRadius: '2px', overflow: 'hidden' }}>
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${cat.value}%` }} transition={{ duration: 1, delay: 0.5 }} style={{ height: '100%', background: cat.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamResults;
