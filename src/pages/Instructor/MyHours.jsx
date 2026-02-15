import { useState } from 'react';
import { Clock, Calendar, Plus, X, Car, MapPin, AlertCircle } from 'lucide-react';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Button from '../../components/UI/Button';

// Mock Data
const MOCK_STUDENTS = [
    { value: '1', label: 'Juan Pérez (10203040)' },
    { value: '2', label: 'María González (50607080)' },
    { value: '3', label: 'Carlos Rodríguez (90102030)' },
];

const ACTIVITY_TYPES = [
    { value: 'Pista', label: 'Pista (Maniobras)' },
    { value: 'Tráfico', label: 'Tráfico (Calle)' },
    { value: 'Carretera', label: 'Carretera (Viaje)' },
    { value: 'Parqueo', label: 'Estacionamiento' },
];

const INITIAL_LOGS = [
    { id: 1, date: '2025-02-14', time: '08:00 - 10:00', student: 'Juan Pérez', activity: 'Pista', hours: 2, status: 'Verificado' },
    { id: 2, date: '2025-02-13', time: '14:00 - 16:00', student: 'María González', activity: 'Tráfico', hours: 2, status: 'Verificado' },
    { id: 3, date: '2025-02-12', time: '09:00 - 11:00', student: 'Juan Pérez', activity: 'Carretera', hours: 2, status: 'Verificado' },
    { id: 4, date: '2025-02-11', time: '16:00 - 18:00', student: 'Carlos Rodríguez', activity: 'Pista', hours: 2, status: 'Pendiente' },
];

const MyHours = () => {
    const [logs, setLogs] = useState(INITIAL_LOGS);
    const [showModal, setShowModal] = useState(false);
    const [newLog, setNewLog] = useState({
        studentId: '',
        date: new Date().toISOString().split('T')[0],
        startTime: '08:00',
        endTime: '10:00',
        activity: 'Pista',
        observations: ''
    });

    // Calculate metrics
    const totalHours = logs.reduce((acc, curr) => acc + curr.hours, 0);
    const pendingHours = logs.filter(l => l.status === 'Pendiente').reduce((acc, curr) => acc + curr.hours, 0);

    const handleSave = (e) => {
        e.preventDefault();

        // Simple duration calc (mock)
        const start = parseInt(newLog.startTime.split(':')[0]);
        const end = parseInt(newLog.endTime.split(':')[0]);
        const duration = Math.max(0, end - start);

        const studentName = MOCK_STUDENTS.find(s => s.value === newLog.studentId)?.label.split(' (')[0] || 'Estudiante';

        const entry = {
            id: Date.now(),
            date: newLog.date,
            time: `${newLog.startTime} - ${newLog.endTime}`,
            student: studentName,
            activity: newLog.activity,
            hours: duration,
            status: 'Pendiente'
        };

        setLogs([entry, ...logs]);
        setShowModal(false);
        setNewLog({ ...newLog, studentId: '', observations: '' });
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px', animation: 'fadeIn 0.5s ease-out' }}>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .glass-card { background: white; border-radius: 20px; box-shadow: 0 4px 24px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.02); }
            `}</style>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '6px' }}>Mis Horas</h1>
                    <p style={{ color: '#86868b', fontSize: '15px' }}>Gestiona y registra tus clases prácticas.</p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    <Plus size={20} /> Registrar Clase
                </Button>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '52px', height: '52px', background: '#E8F5E9', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2E7D32' }}>
                        <Clock size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#86868b', fontWeight: 500 }}>Total Horas</div>
                        <div style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px' }}>{totalHours} h</div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '52px', height: '52px', background: '#FFF3E0', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF6C00' }}>
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#86868b', fontWeight: 500 }}>Horas Pendientes</div>
                        <div style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px' }}>{pendingHours} h</div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '52px', height: '52px', background: '#E3F2FD', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1565C0' }}>
                        <Calendar size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#86868b', fontWeight: 500 }}>Clases este Mes</div>
                        <div style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px' }}>{logs.length}</div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #f5f5f7' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 600 }}>Historial Reciente</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', fontSize: '13px', color: '#86868b', background: '#fafafa' }}>
                                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Fecha / Hora</th>
                                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Estudiante</th>
                                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Actividad</th>
                                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Duración</th>
                                <th style={{ padding: '16px 24px', fontWeight: 500 }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => (
                                <tr key={log.id} style={{ borderTop: '1px solid #f5f5f7' }}>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{log.date}</div>
                                        <div style={{ fontSize: '12px', color: '#86868b' }}>{log.time}</div>
                                    </td>
                                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#1d1d1f' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '24px', height: '24px', background: '#f5f5f7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#86868b' }}>
                                                {log.student.charAt(0)}
                                            </div>
                                            {log.student}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#424245' }}>
                                            {log.activity === 'Tráfico' ? <Car size={14} /> : <MapPin size={14} />}
                                            {log.activity}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{log.hours} h</td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{
                                            fontSize: '12px', fontWeight: 500,
                                            padding: '4px 10px', borderRadius: '20px',
                                            background: log.status === 'Verificado' ? '#E8F5E9' : '#FFF3E0',
                                            color: log.status === 'Verificado' ? '#2E7D32' : '#EF6C00'
                                        }}>
                                            {log.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal "Registrar Clase" */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <div style={{ background: 'white', width: '90%', maxWidth: '500px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid #f5f5f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Registrar Nueva Clase</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#86868b' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Select
                                label="Estudiante"
                                value={newLog.studentId}
                                onChange={e => setNewLog({ ...newLog, studentId: e.target.value })}
                                options={[
                                    { value: '', label: 'Seleccionar Estudiante...' },
                                    ...MOCK_STUDENTS
                                ]}
                            />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <Input
                                    label="Fecha"
                                    type="date"
                                    value={newLog.date}
                                    onChange={e => setNewLog({ ...newLog, date: e.target.value })}
                                    required
                                />
                                <Select
                                    label="Actividad"
                                    value={newLog.activity}
                                    onChange={e => setNewLog({ ...newLog, activity: e.target.value })}
                                    options={ACTIVITY_TYPES}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <Input
                                    label="Hora Inicio"
                                    type="time"
                                    value={newLog.startTime}
                                    onChange={e => setNewLog({ ...newLog, startTime: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Hora Fin"
                                    type="time"
                                    value={newLog.endTime}
                                    onChange={e => setNewLog({ ...newLog, endTime: e.target.value })}
                                    required
                                />
                            </div>

                            <Input
                                label="Observaciones (Opcional)"
                                placeholder="Ej. Buen manejo de espejos, mejorar cambios."
                                value={newLog.observations}
                                onChange={e => setNewLog({ ...newLog, observations: e.target.value })}
                            />

                            <div style={{ paddingTop: '10px' }}>
                                <Button type="submit" style={{ width: '100%' }}>Guardar Registro</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyHours;
