import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
    Users,
    BookOpen,
    Shield,
    TrendingUp,
    DollarSign,
    Calendar,
    ChevronRight,
    ArrowUpRight,
    Activity
} from 'lucide-react';
import Button from '../components/UI/Button';

const StatCard = ({ label, value, icon: Icon, color, trend }) => (
    <motion.div
        whileHover={{ y: -5 }}
        style={{
            background: 'white',
            padding: '24px',
            borderRadius: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{
                padding: '12px',
                borderRadius: '16px',
                background: `${color}10`,
                color: color
            }}>
                <Icon size={24} />
            </div>
            {trend && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#34C759',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: 'rgba(52,199,89,0.1)',
                    padding: '4px 8px',
                    borderRadius: '8px'
                }}>
                    <ArrowUpRight size={14} />
                    {trend}
                </div>
            )}
        </div>
        <div>
            <div style={{ color: '#86868b', fontSize: '14px', fontWeight: 500 }}>{label}</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#1d1d1f' }}>{value}</div>
        </div>
    </motion.div>
);

const DashboardHome = () => {
    const { user } = useAuth();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Buenos días';
        if (hour < 18) return 'Buenas tardes';
        return 'Buenas noches';
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
            {/* Header */}
            <header style={{ marginBottom: '40px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>
                        {getGreeting()}, {user?.name.split(' ')[0]}
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#86868b', fontSize: '18px' }}>
                        <Shield size={20} style={{ color: '#0071e3' }} />
                        <span>{user?.schoolName || 'Global Management'}</span>
                    </div>
                </motion.div>
            </header>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                <StatCard
                    label="Alumnos Activos"
                    value="124"
                    icon={Users}
                    color="#0071e3"
                    trend="+12%"
                />
                <StatCard
                    label="Ingresos Mensuales"
                    value="$12.4M"
                    icon={DollarSign}
                    color="#34C759"
                    trend="+8%"
                />
                <StatCard
                    label="Exámenes Hoy"
                    value="18"
                    icon={BookOpen}
                    color="#AF52DE"
                />
                <StatCard
                    label="Rendimiento Prom."
                    value="86%"
                    icon={TrendingUp}
                    color="#FF9500"
                    trend="+5%"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Recent Activity */}
                <div style={{ background: 'white', padding: '32px', borderRadius: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Activity size={20} style={{ color: '#0071e3' }} />
                            Actividad Reciente
                        </h2>
                        <button style={{ background: 'none', border: 'none', color: '#0071e3', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
                            Ver todo
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {[
                            { user: 'Ana Garcia', action: 'se registró en categoría B1', time: 'hace 2 horas', icon: Users },
                            { user: 'Pedro Lopez', action: 'aprobó examen teórico #4', time: 'hace 3 horas', icon: BookOpen },
                            { user: 'Maria Diaz', action: 'realizó un abono de $200.000', time: 'hace 5 horas', icon: DollarSign },
                            { user: 'Juan Instructor', action: 'completó revisión de flota', time: 'hace 6 horas', icon: Activity }
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86868b' }}>
                                    <item.icon size={20} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '14px', color: '#1d1d1f', margin: 0 }}>
                                        <strong>{item.user}</strong> {item.action}
                                    </p>
                                    <span style={{ fontSize: '12px', color: '#86868b' }}>{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Tasks/Events */}
                <div style={{ background: '#1d1d1f', padding: '32px', borderRadius: '32px', color: 'white' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Calendar size={20} />
                        Próximas Tareas
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { title: 'Revisión SOAT Placa ABC-123', date: 'Mañana, 09:00 AM' },
                            { title: 'Mantenimiento preventivo Camión Rígido', date: '16 Feb, 2025' },
                            { title: 'Cierre de caja quincenal', date: '15 Feb, 2025' }
                        ].map((task, i) => (
                            <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{task.title}</div>
                                <div style={{ fontSize: '12px', color: '#86868b' }}>{task.date}</div>
                            </div>
                        ))}
                    </div>
                    <Button variant="primary" style={{ width: '100%', marginTop: '24px', background: 'white', color: '#1d1d1f' }}>
                        Añadir Tarea
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
