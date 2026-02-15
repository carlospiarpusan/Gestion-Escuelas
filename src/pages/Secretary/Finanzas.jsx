import { useState } from 'react';
import {
    DollarSign,
    Calendar,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard,
    Wallet,
    Smartphone,
    TrendingUp,
    Search,
    ChevronRight,
    Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/UI/Button';

const MOCK_TRANSACTIONS = [
    { id: 1, student: 'Ana Garcia', amount: 200000, method: 'Efectivo', date: '2025-02-14', time: '14:30', category: 'Abono Matrícula' },
    { id: 2, student: 'Pedro Lopez', amount: 50000, method: 'Transferencia', date: '2025-02-14', time: '12:15', category: 'Abono Cuota' },
    { id: 3, student: 'Maria Diaz', amount: 150000, method: 'Tarjeta', date: '2025-02-14', time: '10:00', category: 'Saldo Total' },
    { id: 4, student: 'Julia Sanz', amount: 100000, method: 'Sistecredito', date: '2025-02-14', time: '09:30', category: 'Abono inicial' },
    { id: 5, student: 'Luis Torres', amount: 300000, method: 'Efectivo', date: '2025-02-13', time: '16:45', category: 'Trámite Licencia' },
    { id: 6, student: 'Ana Garcia', amount: 120000, method: 'Transferencia', date: '2025-02-13', time: '11:20', category: 'Abono mensual' },
];

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <div style={{
        background: 'white', padding: '24px', borderRadius: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)', flex: 1, minWidth: '240px'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: `${color}15`, color: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <Icon size={24} />
            </div>
            {trend && (
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    color: trend > 0 ? '#2E7D32' : '#ff3b30', fontSize: '13px', fontWeight: 600
                }}>
                    {trend > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {Math.abs(trend)}%
                </div>
            )}
        </div>
        <div style={{ color: '#86868b', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '28px', fontWeight: 700, color: '#1d1d1f' }}>${value.toLocaleString()}</div>
    </div>
);

const Finanzas = () => {
    const [filterRange, setFilterRange] = useState('Diario'); // Diario, Semanal, Mensual
    const [searchTerm, setSearchTerm] = useState('');

    const stats = {
        Diario: { total: 500000, previous: 420000, trend: 12 },
        Semanal: { total: 2800000, previous: 2500000, trend: 8 },
        Mensual: { total: 12500000, previous: 11000000, trend: 15 }
    };

    const methodBreakdown = [
        { name: 'Efectivo', value: 500000, icon: Wallet, color: '#0071e3' },
        { name: 'Transferencia', value: 350000, icon: Smartphone, color: '#5e5ce6' },
        { name: 'Tarjeta', value: 200000, icon: CreditCard, color: '#af52de' },
        { name: 'Sistecredito', value: 150000, icon: DollarSign, color: '#ff9500' }
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
            {/* Header */}
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Caja / Control de Dinero</h1>
                    <p style={{ color: '#86868b', fontSize: '17px' }}>Seguimiento detallado de ingresos y métodos de pago.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="secondary" onClick={() => alert('Exportando reporte...')}>
                        <Download size={18} /> Exportar
                    </Button>
                </div>
            </div>

            {/* Filter Selector */}
            <div style={{
                background: '#f5f5f7', padding: '4px', borderRadius: '12px',
                display: 'inline-flex', marginBottom: '32px'
            }}>
                {['Diario', 'Semanal', 'Mensual'].map(range => (
                    <button
                        key={range}
                        onClick={() => setFilterRange(range)}
                        style={{
                            padding: '8px 20px', borderRadius: '10px', border: 'none',
                            background: filterRange === range ? 'white' : 'transparent',
                            color: filterRange === range ? '#1d1d1f' : '#86868b',
                            fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                            boxShadow: filterRange === range ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                            transition: 'all 0.2s'
                        }}
                    >
                        {range}
                    </button>
                ))}
            </div>

            {/* Main Stats Row */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
                <StatCard
                    title={`Ingresos ${filterRange}`}
                    value={stats[filterRange].total}
                    icon={TrendingUp}
                    trend={stats[filterRange].trend}
                    color="#0071e3"
                />
                <StatCard
                    title="Promedio por Transacción"
                    value={stats[filterRange].total / 12}
                    icon={DollarSign}
                    color="#2E7D32"
                />
                <StatCard
                    title="Meta del Periodo"
                    value={stats[filterRange].total * 1.2}
                    icon={ArrowUpRight}
                    color="#af52de"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
                {/* Transaction History */}
                <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                    <div style={{ padding: '24px', borderBottom: '1px solid #f5f5f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Transacciones Recientes</h3>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#86868b' }} />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                style={{
                                    padding: '8px 12px 8px 36px', borderRadius: '10px', border: '1px solid #e5e5e5',
                                    background: '#f5f5f7', fontSize: '14px'
                                }}
                            />
                        </div>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', background: '#fafafa', fontSize: '12px', color: '#86868b' }}>
                                <th style={{ padding: '16px 24px', fontWeight: 600 }}>ALUMNO / DETALLE</th>
                                <th style={{ padding: '16px 24px', fontWeight: 600 }}>MÉTODO</th>
                                <th style={{ padding: '16px 24px', fontWeight: 600 }}>FECHA</th>
                                <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>VALOR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_TRANSACTIONS.map(tx => (
                                <tr key={tx.id} style={{ borderBottom: '1px solid #f5f5f7' }}>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{tx.student}</div>
                                        <div style={{ fontSize: '12px', color: '#86868b' }}>{tx.category}</div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{
                                            padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                                            background: '#f5f5f7', color: '#1d1d1f'
                                        }}>
                                            {tx.method}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ fontSize: '13px', color: '#1d1d1f' }}>{tx.date}</div>
                                        <div style={{ fontSize: '11px', color: '#86868b' }}>{tx.time}</div>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right', fontWeight: 700, color: '#1d1d1f' }}>
                                        +${tx.amount.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ padding: '16px', textAlign: 'center' }}>
                        <button style={{
                            background: 'none', border: 'none', color: '#0071e3',
                            fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '4px', margin: '0 auto'
                        }}>
                            Ver todas las transacciones <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                {/* Method Breakdown Sidecard */}
                <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Por Método de Pago</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {methodBreakdown.map(method => (
                            <div key={method.name}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '8px',
                                            background: `${method.color}15`, color: method.color,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <method.icon size={16} />
                                        </div>
                                        <span style={{ fontSize: '14px', fontWeight: 500, color: '#1d1d1f' }}>{method.name}</span>
                                    </div>
                                    <span style={{ fontSize: '14px', fontWeight: 600 }}>${method.value.toLocaleString()}</span>
                                </div>
                                <div style={{ width: '100%', height: '6px', background: '#f5f5f7', borderRadius: '3px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(method.value / stats[filterRange].total) * 100}%` }}
                                        style={{ height: '100%', background: method.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        marginTop: '32px', padding: '20px', borderRadius: '16px',
                        background: '#1d1d1f', color: 'white'
                    }}>
                        <div style={{ fontSize: '13px', opacity: 0.7, marginBottom: '4px' }}>Total Periodo</div>
                        <div style={{ fontSize: '24px', fontWeight: 700 }}>${stats[filterRange].total.toLocaleString()}</div>
                        <div style={{
                            marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px',
                            color: '#34c759', fontSize: '12px', fontWeight: 600
                        }}>
                            <ArrowUpRight size={14} /> 15% más que el mes anterior
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Finanzas;
