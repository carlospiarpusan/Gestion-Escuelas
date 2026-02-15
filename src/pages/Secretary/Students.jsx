import { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, User, CreditCard, CheckCircle, Clock, AlertCircle, ExternalLink, Edit2, Trash2, DollarSign, PlusCircle, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterPending, setFilterPending] = useState(false);

    // Month/Year filter
    const currentDate = new Date();
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');

    // Fetch students from API
    const fetchStudents = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/students');
            if (!res.ok) throw new Error(`API Error: ${res.status}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setStudents(data);
            } else {
                throw new Error('Invalid data format');
            }
        } catch (err) {
            console.error('Error fetching students:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // UI State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Efectivo');

    const filteredStudents = students.filter(s => {
        const name = (s.name || '').toLowerCase();
        const doc = (s.document || '');
        const matchesSearch = name.includes(searchTerm.toLowerCase()) || doc.includes(searchTerm);
        const cat = (s.category || '');
        const matchesCategory = filterCategory === 'All' ||
            (filterCategory === 'Combo' ? cat.includes('Combo') || cat.includes('-') : cat === filterCategory);

        // Month/Year filter
        let matchesDate = true;
        if (filterMonth || filterYear) {
            const regDate = new Date(s.registered);
            if (filterMonth && (regDate.getMonth() + 1) !== parseInt(filterMonth)) matchesDate = false;
            if (filterYear && regDate.getFullYear() !== parseInt(filterYear)) matchesDate = false;
        }

        // Pending balance filter
        let matchesPending = true;
        if (filterPending) {
            const courseValue = parseFloat(s.courseValue) || 0;
            const balance = parseFloat(s.balance) || 0;
            const debt = courseValue - balance;
            matchesPending = debt > 0;
        }

        return matchesSearch && matchesCategory && matchesDate && matchesPending;
    });

    const handleDelete = () => {
        setStudents(students.filter(s => s.id !== selectedStudent.id));
        setIsDeleteModalOpen(false);
        setSelectedStudent(null);
        setActiveMenuId(null);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setStudents(students.map(s => {
            if (s.id === selectedStudent.id) {
                const isPaid = (s.balance || 0) >= selectedStudent.courseValue;
                return { ...selectedStudent, payment: isPaid ? 'Paid' : 'Pending' };
            }
            return s;
        }));
        setIsEditModalOpen(false);
        setSelectedStudent(null);
        setActiveMenuId(null);
    };

    const handleAddPayment = async (e) => {
        e.preventDefault();
        const amount = parseFloat(paymentAmount);
        if (isNaN(amount) || amount <= 0) return;

        try {
            const res = await fetch('/api/payments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    alumnoId: selectedStudent.id,
                    amount,
                    paymentMethod,
                    concepto: 'Abono'
                })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Error al registrar abono');
            }

            // Refresh students from DB
            await fetchStudents();
        } catch (err) {
            console.error('Payment error:', err);
            alert('Error al registrar abono: ' + err.message);
        }

        setIsPaymentModalOpen(false);
        setPaymentAmount('');
        setPaymentMethod('Efectivo');
        setSelectedStudent(null);
    };

    // Generate year options
    const yearOptions = [];
    for (let y = currentDate.getFullYear(); y >= currentDate.getFullYear() - 3; y--) {
        yearOptions.push(y);
    }

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Summary stats
    const totalStudents = students.length;
    const studentsWithDebt = students.filter(s => {
        const cv = parseFloat(s.courseValue) || 0;
        const bal = parseFloat(s.balance) || 0;
        return cv > 0 && (cv - bal) > 0;
    }).length;
    const totalDebt = students.reduce((sum, s) => {
        const cv = parseFloat(s.courseValue) || 0;
        const bal = parseFloat(s.balance) || 0;
        return sum + Math.max(0, cv - bal);
    }, 0);

    return (
        <div
            style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}
            onClick={() => setActiveMenuId(null)}
        >
            {/* Header Area */}
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Gestión de Alumnos</h1>
                    <p style={{ color: '#86868b', fontSize: '17px' }}>Administra la base de datos de estudiantes y sus estados.</p>
                </div>
                <Button onClick={() => window.location.href = '/dashboard/register-student'}>
                    <User size={18} /> Nuevo Alumno
                </Button>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: 'white', padding: '20px', borderRadius: '18px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                    <div style={{ fontSize: '12px', color: '#86868b', fontWeight: 600, marginBottom: '4px' }}>TOTAL ALUMNOS</div>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: '#1d1d1f' }}>{totalStudents}</div>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '18px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                    <div style={{ fontSize: '12px', color: '#86868b', fontWeight: 600, marginBottom: '4px' }}>CON SALDO PENDIENTE</div>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: studentsWithDebt > 0 ? '#EF6C00' : '#1d1d1f' }}>{studentsWithDebt}</div>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '18px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                    <div style={{ fontSize: '12px', color: '#86868b', fontWeight: 600, marginBottom: '4px' }}>TOTAL POR COBRAR</div>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: totalDebt > 0 ? '#ff3b30' : '#2E7D32' }}>${totalDebt.toLocaleString()}</div>
                </div>
            </div>

            {/* Filters Bar */}
            <div style={{
                background: 'var(--card-bg)', padding: '20px', borderRadius: '24px', marginBottom: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap'
            }}>
                <div style={{ flex: 1, position: 'relative', minWidth: '180px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#86868b' }} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o cédula..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onClick={e => e.stopPropagation()}
                        style={{
                            width: '100%', padding: '12px 16px 12px 48px', borderRadius: '14px',
                            border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontSize: '15px', color: 'var(--text-main)'
                        }}
                    />
                </div>

                {/* Month/Year Filter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-color)', padding: '6px 12px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                    <Calendar size={16} style={{ color: '#86868b' }} />
                    <select
                        value={filterMonth}
                        onChange={e => setFilterMonth(e.target.value)}
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: 'transparent', border: 'none', fontSize: '13px',
                            color: 'var(--text-main)', outline: 'none', cursor: 'pointer',
                            padding: '6px 4px', minWidth: '110px'
                        }}
                    >
                        <option value="">Todos los meses</option>
                        {monthNames.map((name, i) => (
                            <option key={i} value={i + 1}>{name}</option>
                        ))}
                    </select>
                    <select
                        value={filterYear}
                        onChange={e => setFilterYear(e.target.value)}
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: 'transparent', border: 'none', fontSize: '13px',
                            color: 'var(--text-main)', outline: 'none', cursor: 'pointer',
                            padding: '6px 4px', minWidth: '70px'
                        }}
                    >
                        <option value="">Año</option>
                        {yearOptions.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                    {(filterMonth || filterYear) && (
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setFilterMonth(''); setFilterYear(''); }}
                            style={{
                                background: '#FFE5E5', color: '#ff3b30', border: 'none',
                                padding: '4px 8px', borderRadius: '8px', fontSize: '12px',
                                fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Pending Balance Filter */}
                <button
                    onClick={(e) => { e.stopPropagation(); setFilterPending(!filterPending); }}
                    style={{
                        padding: '10px 16px', borderRadius: '12px',
                        border: filterPending ? '2px solid #EF6C00' : '1px solid var(--border-color)',
                        background: filterPending ? '#FFF3E0' : 'var(--card-bg)',
                        color: filterPending ? '#EF6C00' : 'var(--text-secondary)',
                        fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                        display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap'
                    }}
                >
                    <DollarSign size={14} />
                    Saldo Pendiente
                </button>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {['All', 'A2', 'B1', 'C1', 'C2', 'RC1', 'Combo'].map(cat => (
                        <button
                            key={cat}
                            onClick={(e) => { e.stopPropagation(); setFilterCategory(cat); }}
                            style={{
                                padding: '8px 14px', borderRadius: '10px', border: '1px solid var(--border-color)',
                                background: filterCategory === cat ? 'var(--text-main)' : 'var(--card-bg)',
                                color: filterCategory === cat ? 'var(--bg-color)' : 'var(--text-main)',
                                fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            {cat === 'All' ? 'Todas' : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div style={{ background: '#FFF5F5', color: '#ff3b30', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* Loading State */}
            {isLoading && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#86868b' }}>
                    Cargando alumnos...
                </div>
            )}

            {/* Table Area */}
            <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', background: '#fafafa', fontSize: '12px', color: '#86868b' }}>
                            <th style={{ padding: '16px 24px', fontWeight: 600 }}>ALUMNO</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600 }}>CATEGORÍA</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600 }}>VALOR CURSO</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600 }}>ABONADO</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600 }}>POR PAGAR</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600 }}>REGISTRO</th>
                            <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence mode='popLayout'>
                            {filteredStudents.map((student) => {
                                const courseValue = parseFloat(student.courseValue) || 0;
                                const balance = parseFloat(student.balance) || 0;
                                const debt = Math.max(0, courseValue - balance);
                                const isPaid = courseValue > 0 && debt === 0;
                                return (
                                    <motion.tr
                                        layout
                                        key={student.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{ borderBottom: '1px solid #f5f5f7' }}
                                    >
                                        <td style={{ padding: '16px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86868b' }}>
                                                    <User size={18} />
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{student.name || 'Sin nombre'}</div>
                                                    <div style={{ fontSize: '12px', color: '#86868b' }}>{student.document || student.email || ''}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            {student.category ? (
                                                <span style={{
                                                    fontSize: '13px', fontWeight: 600, color: '#0071e3',
                                                    background: '#E3F2FD', padding: '4px 10px', borderRadius: '8px'
                                                }}>
                                                    {student.category}
                                                </span>
                                            ) : (
                                                <span style={{ fontSize: '13px', color: '#86868b' }}>—</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>
                                                {courseValue > 0 ? `$${courseValue.toLocaleString()}` : '—'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: 600, color: balance > 0 ? '#2E7D32' : '#86868b' }}>
                                                ${balance.toLocaleString()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                <span style={{
                                                    fontSize: '14px', fontWeight: 600,
                                                    color: isPaid ? '#2E7D32' : debt > 0 ? '#ff3b30' : '#86868b'
                                                }}>
                                                    {isPaid ? (
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                            <CheckCircle size={14} /> Pagado
                                                        </span>
                                                    ) : (
                                                        `$${debt.toLocaleString()}`
                                                    )}
                                                </span>
                                                {student.lastPaymentMethod && (
                                                    <div style={{ fontSize: '10px', color: '#86868b', fontWeight: 500 }}>
                                                        Ult: {student.lastPaymentMethod}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#86868b' }}>
                                            {student.registered || '—'}
                                        </td>
                                        <td style={{ padding: '16px 24px', textAlign: 'right', position: 'relative' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setSelectedStudent(student); setIsEditModalOpen(true); }}
                                                    style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#0071e3', cursor: 'pointer' }}
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setSelectedStudent(student); setIsDeleteModalOpen(true); }}
                                                    style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#ff3b30', cursor: 'pointer' }}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === student.id ? null : student.id); }}
                                                    style={{
                                                        padding: '8px', borderRadius: '8px', border: 'none',
                                                        background: activeMenuId === student.id ? '#f5f5f7' : 'transparent',
                                                        color: '#86868b', cursor: 'pointer'
                                                    }}
                                                >
                                                    <MoreHorizontal size={16} />
                                                </button>

                                                {/* Dropdown Menu */}
                                                <AnimatePresence>
                                                    {activeMenuId === student.id && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                            style={{
                                                                position: 'absolute', top: '100%', right: '24px', width: '180px',
                                                                background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(20px)',
                                                                borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                                                border: '1px solid rgba(0,0,0,0.05)', padding: '8px', zIndex: 100,
                                                                textAlign: 'left'
                                                            }}
                                                            onClick={e => e.stopPropagation()}
                                                        >
                                                            <button
                                                                onClick={() => { setSelectedStudent(student); setIsPaymentModalOpen(true); setActiveMenuId(null); }}
                                                                style={{
                                                                    width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                                                                    padding: '10px 12px', borderRadius: '10px', border: 'none',
                                                                    background: 'transparent', fontSize: '13px', fontWeight: 600,
                                                                    color: '#2E7D32', cursor: 'pointer', transition: 'background 0.2s'
                                                                }}
                                                                onMouseOver={e => e.currentTarget.style.background = '#F5F5F7'}
                                                                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                                                            >
                                                                <DollarSign size={14} />
                                                                Registrar Abono
                                                            </button>
                                                            <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.05)', margin: '4px 0' }} />
                                                            {[
                                                                { label: 'Ver Perfil', icon: User, color: '#1d1d1f' },
                                                                { label: 'Historial Exámenes', icon: ExternalLink, color: '#0071e3' },
                                                                { label: 'Enviar Correo', icon: AlertCircle, color: '#86868b' }
                                                            ].map((item, idx) => (
                                                                <button
                                                                    key={idx}
                                                                    onClick={() => { alert(`${item.label} para ${student.name}`); setActiveMenuId(null); }}
                                                                    style={{
                                                                        width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                                                                        padding: '10px 12px', borderRadius: '10px', border: 'none',
                                                                        background: 'transparent', fontSize: '13px', fontWeight: 500,
                                                                        color: item.color, cursor: 'pointer', transition: 'background 0.2s'
                                                                    }}
                                                                    onMouseOver={e => e.currentTarget.style.background = '#F5F5F7'}
                                                                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                                                                >
                                                                    <item.icon size={14} />
                                                                    {item.label}
                                                                </button>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </AnimatePresence>
                    </tbody>
                </table>
                {filteredStudents.length === 0 && !isLoading && (
                    <div style={{ padding: '60px', textAlign: 'center', color: '#86868b' }}>
                        <AlertCircle size={40} style={{ margin: '0 auto 16px', opacity: 0.2 }} />
                        <p>No se encontraron alumnos con los criterios de búsqueda.</p>
                    </div>
                )}
            </div>

            {/* Payment Modal */}
            <AnimatePresence>
                {isPaymentModalOpen && (
                    <div
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                        }}
                        onClick={() => setIsPaymentModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: 'white', width: '400px', padding: '32px', borderRadius: '24px' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#E8F5E9', color: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                <DollarSign size={24} />
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Registrar Abono</h3>
                            <p style={{ color: '#86868b', fontSize: '14px', marginBottom: '24px' }}>
                                Registra un abono para <strong>{selectedStudent?.name}</strong>.
                                Saldo pendiente: ${((parseFloat(selectedStudent?.courseValue) || 0) - (parseFloat(selectedStudent?.balance) || 0)).toLocaleString()}
                            </p>

                            <form onSubmit={handleAddPayment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <Input
                                    label="Monto del Abono ($)"
                                    type="number"
                                    placeholder="Ej: 50000"
                                    value={paymentAmount}
                                    onChange={e => setPaymentAmount(e.target.value)}
                                    autoFocus
                                />

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '13px', fontWeight: 500, color: '#86868b' }}>Tipo de Pago</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                                        {['Efectivo', 'Transferencia', 'Tarjeta', 'Sistecredito'].map((method) => (
                                            <button
                                                key={method}
                                                type="button"
                                                onClick={() => setPaymentMethod(method)}
                                                style={{
                                                    padding: '10px', borderRadius: '12px', border: '1px solid #e5e5e5',
                                                    background: paymentMethod === method ? '#1d1d1f' : '#f5f5f7',
                                                    color: paymentMethod === method ? 'white' : '#1d1d1f',
                                                    fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                                                }}
                                            >
                                                {method}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                                    <Button variant="secondary" type="button" style={{ flex: 1 }} onClick={() => setIsPaymentModalOpen(false)}>Cancelar</Button>
                                    <Button type="submit" style={{ flex: 1 }}>Registrar</Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                        }}
                        onClick={() => setIsDeleteModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: 'white', width: '400px', padding: '32px', borderRadius: '24px', textAlign: 'center' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#FFF5F5', color: '#ff3b30', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                <Trash2 size={24} />
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>¿Eliminar Alumno?</h3>
                            <p style={{ color: '#86868b', fontSize: '15px', marginBottom: '32px' }}>
                                Esta acción no se puede deshacer. Se eliminarán los registros de <strong>{selectedStudent?.name}</strong>.
                            </p>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <Button variant="secondary" style={{ flex: 1 }} onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
                                <Button style={{ flex: 1, background: '#ff3b30' }} onClick={handleDelete}>Eliminar</Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Edit Modal */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                        }}
                        onClick={() => setIsEditModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: 'white', width: '500px', padding: '32px', borderRadius: '24px' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Editar Información</h3>
                            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <Input
                                    label="Nombre Completo"
                                    value={selectedStudent?.name || ''}
                                    onChange={e => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
                                />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <Input
                                        label="Cédula"
                                        value={selectedStudent?.document || ''}
                                        onChange={e => setSelectedStudent({ ...selectedStudent, document: e.target.value })}
                                    />
                                    <Input
                                        label="Valor del Curso ($)"
                                        type="number"
                                        value={selectedStudent?.courseValue || ''}
                                        onChange={e => setSelectedStudent({ ...selectedStudent, courseValue: parseFloat(e.target.value) })}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                                    <Button variant="secondary" type="button" style={{ flex: 1 }} onClick={() => setIsEditModalOpen(false)}>Cancelar</Button>
                                    <Button type="submit" style={{ flex: 1 }}>Guardar Cambios</Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Students;
