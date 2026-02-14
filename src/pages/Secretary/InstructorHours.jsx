import { useState } from 'react';
import { Save, Calendar, Clock } from 'lucide-react';

const MOCK_INSTRUCTORS = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'Maria Rodriguez' },
    { id: 3, name: 'Carlos Gomez' },
];

const InstructorHoursLink = () => {
    const [selectedInstructor, setSelectedInstructor] = useState(MOCK_INSTRUCTORS[0].id);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [hours, setHours] = useState('');
    const [logs, setLogs] = useState([
        { id: 101, instructor: 'Juan Pérez', date: '2025-02-14', hours: 8 },
        { id: 102, instructor: 'Maria Rodriguez', date: '2025-02-14', hours: 6.5 },
    ]);

    const handleSave = (e) => {
        e.preventDefault();
        const instructorName = MOCK_INSTRUCTORS.find(i => i.id === Number(selectedInstructor))?.name;

        const newLog = {
            id: Date.now(),
            instructor: instructorName,
            date,
            hours: Number(hours)
        };

        setLogs([newLog, ...logs]);
        setHours('');
        // Here you would call the API to save to Supabase/Neon
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>Registro de Horas Instructor</h1>

            <div style={{
                background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e5e5',
                marginBottom: '32px'
            }}>
                <h3 style={{ fontSize: '16px', fontWeight: 500, marginBottom: '20px' }}>Nuevo Registro</h3>
                <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'end' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#666' }}>Instructor</label>
                        <select
                            value={selectedInstructor}
                            onChange={(e) => setSelectedInstructor(e.target.value)}
                            style={{
                                width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd',
                                fontSize: '14px', background: '#f9f9f9'
                            }}
                        >
                            {MOCK_INSTRUCTORS.map(inst => (
                                <option key={inst.id} value={inst.id}>{inst.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#666' }}>Fecha</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{
                                width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd',
                                fontSize: '14px', background: '#f9f9f9'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#666' }}>Horas Trabajadas</label>
                        <input
                            type="number"
                            step="0.5"
                            placeholder="Ej. 8.0"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            required
                            style={{
                                width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd',
                                fontSize: '14px', background: '#f9f9f9'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            background: '#0071e3', color: 'white', border: 'none', padding: '12px',
                            borderRadius: '8px', fontWeight: 500, cursor: 'pointer', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', gap: '8px'
                        }}
                    >
                        <Save size={16} /> Registrar
                    </button>
                </form>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e5e5e5', overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #eee', background: '#fafafa' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 500 }}>Registros Recientes</h3>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', fontSize: '13px', color: '#666' }}>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Instructor</th>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Fecha</th>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Horas</th>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Registrado Por</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(log => (
                            <tr key={log.id} style={{ borderTop: '1px solid #eee' }}>
                                <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 500 }}>{log.instructor}</td>
                                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#666' }}>{log.date}</td>
                                <td style={{ padding: '16px 24px', fontSize: '14px' }}>
                                    <span style={{
                                        padding: '4px 10px', background: '#E3F2FD', color: '#0071e3',
                                        borderRadius: '12px', fontSize: '13px', fontWeight: 500
                                    }}>
                                        {log.hours} h
                                    </span>
                                </td>
                                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#888' }}>Secretaria</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InstructorHoursLink;
