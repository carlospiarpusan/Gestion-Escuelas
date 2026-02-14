import { useState } from 'react';
import { Save, UserPlus, CreditCard, AlertCircle } from 'lucide-react';

const LICENSE_CATEGORIES = ['A2', 'B1', 'C1', 'RC1', 'A2-B1', 'A2-C1', 'A2-RC1'];
const PAYMENT_METHODS = ['Efectivo', 'Tarjeta', 'Nequi', 'Sistecredito'];

// Mock Tramitadores for Dropdown
const MOCK_TRAMITADORES = [
    { id: 1, name: 'Juan Tramitador' },
    { id: 2, name: 'Agencia Externa A' },
];

const RegisterStudent = () => {
    // Form State
    const [formData, setFormData] = useState({
        cedula: '',
        name: '',
        email: '',
        contractNumber: '',
        category: 'A2',
        courseValue: '',
        hasTramitador: false,
        tramitadorId: '',
        tramitadorFee: '',
        initialPayment: '',
        paymentMethod: 'Efectivo'
    });

    const [showTramitadorModal, setShowTramitadorModal] = useState(false);
    const [newTramitadorName, setNewTramitadorName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registering Student:', formData);
        alert('Estudiante registrado exitosamente (Simulación)');
        // Reset form or redirect
    };

    const handleCreateTramitador = () => {
        if (!newTramitadorName) return;
        // Logic to add to DB mock
        MOCK_TRAMITADORES.push({ id: Date.now(), name: newTramitadorName });
        setFormData({ ...formData, tramitadorId: MOCK_TRAMITADORES[MOCK_TRAMITADORES.length - 1].id, hasTramitador: true });
        setShowTramitadorModal(false);
        setNewTramitadorName('');
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 600 }}>Registrar Nuevo Alumno</h1>
                <p style={{ color: '#666', fontSize: '14px' }}>Ingresa los datos del estudiante, contrato y pagos iniciales.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>

                {/* DO LEFT COLUMN: Student Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Sección 1: Datos Personales y Contrato */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e5e5' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <UserPlus size={18} color="#0071e3" /> Información del Estudiante
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Cédula</label>
                                <input
                                    type="text" required
                                    value={formData.cedula}
                                    onChange={e => setFormData({ ...formData, cedula: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Nombre Completo</label>
                                <input
                                    type="text" required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Número de Contrato</label>
                                <input
                                    type="text" required
                                    value={formData.contractNumber}
                                    onChange={e => setFormData({ ...formData, contractNumber: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Email (Opcional)</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sección 2: Curso y Tramitador */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e5e5' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>Detalles del Curso</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Categoría</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                >
                                    {LICENSE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Valor Total del Curso</label>
                                <input
                                    type="number" required
                                    placeholder="0.00"
                                    value={formData.courseValue}
                                    onChange={e => setFormData({ ...formData, courseValue: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                        </div>

                        <div style={{ paddingTop: '16px', borderTop: '1px solid #eee' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '12px' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.hasTramitador}
                                    onChange={e => setFormData({
                                        ...formData,
                                        hasTramitador: e.target.checked,
                                        tramitadorFee: e.target.checked ? formData.tramitadorFee : '0'
                                    })}
                                />
                                <span style={{ fontSize: '14px', fontWeight: 500 }}>¿Es por Tramitador?</span>
                            </label>

                            {formData.hasTramitador && (
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', padding: '16px', background: '#fafafa', borderRadius: '8px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '4px' }}>Seleccionar Tramitador</label>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <select
                                                value={formData.tramitadorId}
                                                onChange={e => setFormData({ ...formData, tramitadorId: e.target.value })}
                                                style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
                                            >
                                                <option value="">Seleccione...</option>
                                                {MOCK_TRAMITADORES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => setShowTramitadorModal(true)}
                                                style={{ background: '#e5e5e5', border: 'none', borderRadius: '6px', width: '36px', cursor: 'pointer' }}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '4px' }}>Comisión / Pago</label>
                                        <input
                                            type="number"
                                            value={formData.tramitadorFee}
                                            onChange={e => setFormData({ ...formData, tramitadorFee: e.target.value })}
                                            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
                                        />
                                    </div>
                                </div>
                            )}

                            {!formData.hasTramitador && (
                                <div style={{ padding: '8px', fontSize: '13px', color: '#666', fontStyle: 'italic' }}>
                                    Tramitador: <span style={{ fontWeight: 600 }}>No Aplica</span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* DO RIGHT COLUMN: Payment Info & Action */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e5e5' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CreditCard size={18} color="#2E7D32" /> Pago Inicial (Abono)
                        </h3>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Monto Abono</label>
                            <input
                                type="number" required
                                placeholder="0.00"
                                value={formData.initialPayment}
                                onChange={e => setFormData({ ...formData, initialPayment: e.target.value })}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px', fontWeight: 600 }}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Tipo de Abono</label>
                            <select
                                value={formData.paymentMethod}
                                onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                            >
                                {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>

                        <div style={{ padding: '12px', background: '#E3F2FD', borderRadius: '8px', fontSize: '13px', color: '#0071e3', display: 'flex', gap: '8px', alignItems: 'start' }}>
                            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>El abono se registrará con la fecha actual automáticamente.</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={{
                            background: '#0071e3', color: 'white', border: 'none', padding: '16px',
                            borderRadius: '12px', fontWeight: 600, fontSize: '16px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            boxShadow: '0 4px 12px rgba(0,113,227,0.3)'
                        }}
                    >
                        <Save size={20} /> Registrar Alumno
                    </button>

                    {/* Summary Card */}
                    <div style={{ padding: '16px', borderRadius: '12px', border: '1px dashed #ccc', color: '#666', fontSize: '13px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span>Valor Curso:</span>
                            <span style={{ fontWeight: 600 }}>${Number(formData.courseValue).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span>Abono Inicial:</span>
                            <span style={{ fontWeight: 600, color: '#2E7D32' }}>-${Number(formData.initialPayment).toLocaleString()}</span>
                        </div>
                        <div style={{ borderTop: '1px solid #eee', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Saldo Pendiente:</span>
                            <span style={{ fontWeight: 600, color: '#EF6C00' }}>
                                ${(Number(formData.courseValue) - Number(formData.initialPayment)).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

            </form>

            {/* Modal Create Tramitador */}
            {showTramitadorModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{ background: 'white', width: '350px', padding: '24px', borderRadius: '16px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Nuevo Tramitador</h3>
                        <input
                            autoFocus
                            className="modal-input"
                            placeholder="Nombre del Tramitador"
                            value={newTramitadorName}
                            onChange={e => setNewTramitadorName(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '20px' }}
                        />
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowTramitadorModal(false)} style={{ background: 'none', border: '1px solid #ddd', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>Cancelar</button>
                            <button onClick={handleCreateTramitador} style={{ background: '#0071e3', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>Crear</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterStudent;
