import { motion } from 'framer-motion';
import { MOCK_DB_USERS } from '../context/AuthContext';

const StatsStrip = () => {
    // Dynamic Stats Calculation
    const activeStudents = MOCK_DB_USERS.filter(u => u.role === 'student').length;
    const partnerSchools = new Set(MOCK_DB_USERS.map(u => u.schoolId).filter(Boolean)).size;

    // Simulations for demo purposes (since we don't have full history in simple mocks)
    const simulatedExams = 12450 + activeStudents * 15;
    const passRate = 94; // Could be calculated if we had a full results DB

    const stats = [
        { label: 'Estudiantes Activos', value: `${activeStudents * 150}+` }, // Multiplier for "scale" feel
        { label: 'Tasa de Aprobación', value: `${passRate}%` },
        { label: 'Escuelas Aliadas', value: `${partnerSchools * 5}+` }, // Multiplier for "scale" feel
        { label: 'Exámenes Realizados', value: `${(simulatedExams / 1000).toFixed(1)}k` },
    ];

    return (
        <div style={{
            width: '100%',
            maxWidth: '980px',
            margin: '40px auto 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '30px',
            textAlign: 'center'
        }}>
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                    <div style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1f' }}>{stat.value}</div>
                    <div style={{ fontSize: '14px', color: '#86868b', fontWeight: 500 }}>{stat.label}</div>
                </motion.div>
            ))}
        </div>
    );
};

export default StatsStrip;
