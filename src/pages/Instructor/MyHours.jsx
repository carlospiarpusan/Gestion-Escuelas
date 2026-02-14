import { Clock, Calendar } from 'lucide-react';

const MOCK_MY_LOGS = [
    { id: 1, date: '2025-02-14', hours: 8, status: 'Verificado' },
    { id: 2, date: '2025-02-13', hours: 7.5, status: 'Verificado' },
    { id: 3, date: '2025-02-12', hours: 8, status: 'Verificado' },
    { id: 4, date: '2025-02-11', hours: 4, status: 'Verificado' },
    { id: 5, date: '2025-02-10', hours: 8, status: 'Verificado' },
];

const MyHours = () => {
    // Calculate totals
    const totalHours = MOCK_MY_LOGS.reduce((acc, curr) => acc + curr.hours, 0);
    const daysWorked = MOCK_MY_LOGS.length;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>Mis Horas</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e5e5', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', background: '#E8F5E9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2E7D32' }}>
                        <Clock size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '13px', color: '#666' }}>Total Horas (Mes)</div>
                        <div style={{ fontSize: '24px', fontWeight: 600 }}>{totalHours} h</div>
                    </div>
                </div>
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e5e5', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', background: '#FFF3E0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF6C00' }}>
                        <Calendar size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '13px', color: '#666' }}>Días Trabajados</div>
                        <div style={{ fontSize: '24px', fontWeight: 600 }}>{daysWorked}</div>
                    </div>
                </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e5e5e5', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', fontSize: '13px', color: '#666', background: '#fafafa' }}>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Fecha</th>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Horas Registradas</th>
                            <th style={{ padding: '16px 24px', fontWeight: 500 }}>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_MY_LOGS.map(log => (
                            <tr key={log.id} style={{ borderTop: '1px solid #eee' }}>
                                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#333' }}>{log.date}</td>
                                <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600 }}>{log.hours}</td>
                                <td style={{ padding: '16px 24px' }}>
                                    <span style={{
                                        fontSize: '12px', color: '#2E7D32', background: '#E8F5E9',
                                        padding: '4px 8px', borderRadius: '6px'
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
    );
};

export default MyHours;
