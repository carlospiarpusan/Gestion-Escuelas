import { useState } from 'react';
import { Calendar, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const INITIAL_PAYMENTS = [
    { id: 1, date: '2025-02-10', amount: 150.00, concept: 'Matrícula Inicial', status: 'Pagado' },
    { id: 2, date: '2025-02-24', amount: 350.00, concept: 'Paquete Práctico (10 clases)', status: 'Pagado' },
    { id: 3, date: '2025-03-10', amount: 100.00, concept: 'Derechos de Examen', status: 'Pendiente' },
    { id: 4, date: '2025-04-10', amount: 100.00, concept: 'Certificación Final', status: 'Pendiente' },
];

const StudentPayments = () => {
    const [payments] = useState(INITIAL_PAYMENTS);

    const totalPaid = payments.filter(p => p.status === 'Pagado').reduce((acc, curr) => acc + curr.amount, 0);
    const nextPayment = payments.find(p => p.status === 'Pendiente');

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Mis Finanzas</h1>
                <p style={{ color: '#86868b', fontSize: '17px' }}>Gestiona tus pagos y estados de cuenta.</p>
            </div>

            {/* Summary Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                marginBottom: '40px'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ background: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ padding: '12px', background: '#E3F2FD', borderRadius: '14px', color: '#0071e3' }}>
                            <DollarSign size={24} />
                        </div>
                        <span style={{ fontSize: '15px', fontWeight: 600, color: '#86868b' }}>Total Pagado</span>
                    </div>
                    <div style={{ fontSize: '40px', fontWeight: 700, color: '#1d1d1f' }}>
                        ${totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ background: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ padding: '12px', background: '#FFF3E0', borderRadius: '14px', color: '#F57C00' }}>
                            <Calendar size={24} />
                        </div>
                        <span style={{ fontSize: '15px', fontWeight: 600, color: '#86868b' }}>Próximo Vencimiento</span>
                    </div>
                    {nextPayment ? (
                        <div>
                            <div style={{ fontSize: '40px', fontWeight: 700, color: '#1d1d1f', marginBottom: '4px' }}>
                                {new Date(nextPayment.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                            </div>
                            <div style={{ fontSize: '15px', color: '#86868b' }}>
                                {nextPayment.concept} - <span style={{ color: '#F57C00', fontWeight: 500 }}>Pendiente</span>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div style={{ fontSize: '24px', fontWeight: 600, color: '#34C759' }}>¡Al día!</div>
                            <div style={{ fontSize: '15px', color: '#86868b' }}>No tienes pagos pendientes.</div>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Payments List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
            >
                <div style={{ padding: '24px 32px', borderBottom: '1px solid #f5f5f7' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1d1d1f' }}>Historial de Pagos</h2>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#fafafa', textAlign: 'left', fontSize: '13px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            <th style={{ padding: '20px 32px', fontWeight: 600 }}>Concepto</th>
                            <th style={{ padding: '20px 32px', fontWeight: 600 }}>Fecha Límite</th>
                            <th style={{ padding: '20px 32px', fontWeight: 600 }}>Monto</th>
                            <th style={{ padding: '20px 32px', fontWeight: 600 }}>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment.id} style={{ borderTop: '1px solid #f5f5f7' }}>
                                <td style={{ padding: '20px 32px', fontSize: '15px', fontWeight: 500, color: '#1d1d1f' }}>
                                    {payment.concept}
                                </td>
                                <td style={{ padding: '20px 32px', fontSize: '15px', color: '#6e6e73' }}>
                                    {payment.date}
                                </td>
                                <td style={{ padding: '20px 32px', fontSize: '15px', fontWeight: 600, color: '#1d1d1f' }}>
                                    ${payment.amount.toFixed(2)}
                                </td>
                                <td style={{ padding: '20px 32px' }}>
                                    <span style={{
                                        padding: '6px 12px', borderRadius: '980px', fontSize: '13px', fontWeight: 600,
                                        background: payment.status === 'Pagado' ? '#E8F5E9' : '#FFF3E0',
                                        color: payment.status === 'Pagado' ? '#2E7D32' : '#EF6C00',
                                        display: 'inline-flex', alignItems: 'center', gap: '6px'
                                    }}>
                                        {payment.status === 'Pagado' ? <CheckCircle size={14} /> : <Clock size={14} />}
                                        {payment.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};
export default StudentPayments;
