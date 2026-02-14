import { CreditCard, Download, Calendar } from 'lucide-react';

const MOCK_PAYMENTS = [
    { id: 1, date: '2025-02-10', amount: 150.00, concept: 'Matrícula Inicial', status: 'Pagado' },
    { id: 2, date: '2025-02-24', amount: 100.00, concept: 'Mensualidad Marzo', status: 'Pagado' },
    { id: 3, date: '2025-03-10', amount: 100.00, concept: 'Derechos de Examen', status: 'Pendiente' },
];

const StudentPayments = () => {
    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 600 }}>Mis Abonos</h1>
                <p style={{ color: '#666', fontSize: '14px' }}>Historial de pagos y estado de cuenta.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#E3F2FD', color: '#0071e3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#666' }}>Total Pagado</div>
                        <div style={{ fontSize: '24px', fontWeight: 600 }}>$250.00</div>
                    </div>
                </div>
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#FFF3E0', color: '#F57C00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Calendar size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#666' }}>Próximo Vencimiento</div>
                        <div style={{ fontSize: '24px', fontWeight: 600 }}>10 Mar</div>
                    </div>
                </div>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e5e5', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f9f9f9', textAlign: 'left', fontSize: '13px', color: '#666' }}>
                            <th style={{ padding: '16px', fontWeight: 500 }}>Fecha</th>
                            <th style={{ padding: '16px', fontWeight: 500 }}>Concepto</th>
                            <th style={{ padding: '16px', fontWeight: 500 }}>Monto</th>
                            <th style={{ padding: '16px', fontWeight: 500 }}>Estado</th>
                            <th style={{ padding: '16px', fontWeight: 500, textAlign: 'right' }}>Recibo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_PAYMENTS.map(payment => (
                            <tr key={payment.id} style={{ borderTop: '1px solid #eee' }}>
                                <td style={{ padding: '16px', fontSize: '14px' }}>{payment.date}</td>
                                <td style={{ padding: '16px', fontSize: '14px', fontWeight: 500 }}>{payment.concept}</td>
                                <td style={{ padding: '16px', fontSize: '14px' }}>${payment.amount.toFixed(2)}</td>
                                <td style={{ padding: '16px', fontSize: '14px' }}>
                                    <span style={{
                                        padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 500,
                                        background: payment.status === 'Pagado' ? '#E8F5E9' : '#FFF3E0',
                                        color: payment.status === 'Pagado' ? '#2E7D32' : '#EF6C00'
                                    }}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td style={{ padding: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                                    {payment.status === 'Pagado' && (
                                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0071e3', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                                            <Download size={14} /> Descargar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentPayments;
