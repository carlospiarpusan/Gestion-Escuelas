import { useState } from 'react';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

const MOCK_RESULTS = [
    { id: 1, student: 'Ana Garcia', school: 'Autoescuela Central', category: 'B1', mode: 40, score: 38, passed: true, date: '2025-02-14' },
    { id: 2, student: 'Pedro Lopez', school: 'Ruta Segura', category: 'A2', mode: 15, score: 10, passed: false, date: '2025-02-14' },
    { id: 3, student: 'Maria Diaz', school: 'Autoescuela Central', category: 'B1', mode: 15, score: 15, passed: true, date: '2025-02-13' },
    { id: 4, student: 'Luis Torres', school: 'Conducción Pro', category: 'C1', mode: 40, score: 35, passed: true, date: '2025-02-12' },
];

const ExamResults = () => {
    const [filterSchool, setFilterSchool] = useState('All');

    const filteredResults = filterSchool === 'All'
        ? MOCK_RESULTS
        : MOCK_RESULTS.filter(r => r.school === filterSchool);

    // Grouping for stats
    const totalExams = filteredResults.length;
    const passedExams = filteredResults.filter(r => r.passed).length;
    const passRate = totalExams > 0 ? Math.round((passedExams / totalExams) * 100) : 0;

    return (
        <div>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 600 }}>Analíticas de Exámenes</h1>
                    <p style={{ color: '#666', fontSize: '14px' }}>Resultados globales y rendimiento.</p>
                </div>

                <select
                    value={filterSchool}
                    onChange={(e) => setFilterSchool(e.target.value)}
                    style={{
                        padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd',
                        background: 'white', fontSize: '14px', cursor: 'pointer'
                    }}
                >
                    <option value="All">Todas las Escuelas</option>
                    <option value="Autoescuela Central">Autoescuela Central</option>
                    <option value="Ruta Segura">Ruta Segura</option>
                    <option value="Conducción Pro">Conducción Pro</option>
                </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e5e5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ padding: '8px', background: '#E3F2FD', color: '#0071e3', borderRadius: '8px' }}><BarChart3 size={20} /></div>
                        <span style={{ fontSize: '13px', color: '#666' }}>Total Exámenes</span>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 600 }}>{totalExams}</div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e5e5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ padding: '8px', background: '#E8F5E9', color: '#2E7D32', borderRadius: '8px' }}><TrendingUp size={20} /></div>
                        <span style={{ fontSize: '13px', color: '#666' }}>Tasa Aprobación</span>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 600 }}>{passRate}%</div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e5e5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ padding: '8px', background: '#FFF3E0', color: '#EF6C00', borderRadius: '8px' }}><Users size={20} /></div>
                        <span style={{ fontSize: '13px', color: '#666' }}>Alumnos Activos</span>
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 600 }}>800+</div>
                </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e5e5e5', overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #eee', background: '#fafafa' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 500 }}>Detalle de Resultados</h3>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', fontSize: '13px', color: '#666' }}>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Estudiante</th>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Escuela</th>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Cat.</th>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Modo</th>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Puntuación</th>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResults.map(res => (
                            <tr key={res.id} style={{ borderTop: '1px solid #eee' }}>
                                <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 500 }}>{res.student}</td>
                                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#666' }}>{res.school}</td>
                                <td style={{ padding: '16px 24px', fontSize: '14px' }}>
                                    <span style={{ background: '#eee', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>{res.category}</span>
                                </td>
                                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#666' }}>{res.mode} pregs.</td>
                                <td style={{ padding: '16px 24px', fontSize: '14px' }}>{res.score}/{res.mode}</td>
                                <td style={{ padding: '16px 24px' }}>
                                    <span style={{
                                        fontSize: '12px', padding: '4px 8px', borderRadius: '6px',
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
    );
};

export default ExamResults;
