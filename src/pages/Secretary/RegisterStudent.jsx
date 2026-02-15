import { useState } from 'react';
import { Save, UserPlus, CreditCard, AlertCircle, Plus } from 'lucide-react';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Button from '../../components/UI/Button';

const LICENSE_CATEGORIES = [
    { value: 'A2', label: 'A2 - Motocicletas' },
    { value: 'B1', label: 'B1 - Automóviles' },
    { value: 'C1', label: 'C1 - Servicio Público' },
    { value: 'RC1', label: 'Recategorización C1' },
    { value: 'A2-B1', label: 'Combo A2 + B1' },
    { value: 'A2-C1', label: 'Combo A2 + C1' }
];

const PAYMENT_METHODS = [
    { value: 'Efectivo', label: 'Efectivo' },
    { value: 'Tarjeta', label: 'Tarjeta Crédito/Débito' },
    { value: 'Nequi', label: 'Nequi / Daviplata' },
    { value: 'Sistecredito', label: 'Sistecrédito' }
];

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
        phone: '',
        address: '',
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
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px', animation: 'fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>

            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '6px', color: '#1d1d1f' }}>Registrar Nuevo Alumno</h1>
                <p style={{ color: '#86868b', fontSize: '15px' }}>Ingresa los datos del estudiante para generar su contrato.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '2fr 1.1fr', gap: '24px' }}>

                {/* Left Column: Student & Course Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Section 1: Personal Info */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#1d1d1f' }}>
                            <div style={{ background: '#E3F2FD', padding: '6px', borderRadius: '8px', color: '#0071e3' }}>
                                <UserPlus size={18} />
                            </div>
                            Información del Estudiante
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <Input
                                label="Cédula de Ciudadanía"
                                placeholder="Ej. 1020304050"
                                value={formData.cedula}
                                onChange={e => setFormData({ ...formData, cedula: e.target.value })}
                                required
                            />
                            <Input
                                label="Nombre Completo"
                                placeholder="Ej. Juan Pérez"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <Input
                                label="Teléfono / Celular"
                                placeholder="Ej. 300 123 4567"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                            <Input
                                label="Dirección de Residencia"
                                placeholder="Ej. Cra 5 # 10-20"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                            />
                            <Input
                                label="Email (Opcional)"
                                type="email"
                                placeholder="juan@ejemplo.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                style={{ gridColumn: 'span 2' }}
                            />
                        </div>
                    </div>

                    {/* Section 2: Course Details */}
                    <div style={{ background: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.02)' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '20px', color: '#1d1d1f' }}>Detalles del Curso</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                            <Select
                                label="Categoría de Licencia"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                options={LICENSE_CATEGORIES}
                            />
                            <Input
                                label="Número de Contrato (Físico)"
                                placeholder="Ej. A-00123"
                                value={formData.contractNumber}
                                onChange={e => setFormData({ ...formData, contractNumber: e.target.value })}
                                required
                            />
                        </div>

                        <div style={{ paddingTop: '16px', borderTop: '1px solid #f5f5f7' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '16px', userSelect: 'none' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.hasTramitador}
                                    onChange={e => setFormData({
                                        ...formData,
                                        hasTramitador: e.target.checked,
                                        tramitadorFee: e.target.checked ? formData.tramitadorFee : '0'
                                    })}
                                    style={{ width: '18px', height: '18px', accentColor: '#0071e3', cursor: 'pointer' }}
                                />
                                <span style={{ fontSize: '14px', fontWeight: 500, color: '#1d1d1f' }}>¿Referido por Agencia?</span>
                            </label>

                            {formData.hasTramitador && (
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', padding: '16px', background: '#F5F5F7', borderRadius: '12px', animation: 'fadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }}>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                                        <div style={{ flex: 1 }}>
                                            <Select
                                                label="Seleccionar Agencia / Referido"
                                                value={formData.tramitadorId}
                                                onChange={e => setFormData({ ...formData, tramitadorId: e.target.value })}
                                                options={[
                                                    { value: '', label: 'Seleccione...' },
                                                    ...MOCK_TRAMITADORES.map(t => ({ value: t.id, label: t.name }))
                                                ]}
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={() => setShowTramitadorModal(true)}
                                            style={{ marginBottom: '16px', padding: '10px' }}
                                        >
                                            <Plus size={18} />
                                        </Button>
                                    </div>
                                    <Input
                                        label="Comisión"
                                        type="number"
                                        value={formData.tramitadorFee}
                                        onChange={e => setFormData({ ...formData, tramitadorFee: e.target.value })}
                                        placeholder="0.00"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Right Column: Financials */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.02)', position: 'sticky', top: '20px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#1d1d1f' }}>
                            <div style={{ background: '#E8F5E9', padding: '6px', borderRadius: '8px', color: '#2E7D32' }}>
                                <CreditCard size={18} />
                            </div>
                            Resumen Financiero
                        </h3>

                        <Input
                            label="Valor Total del Curso"
                            type="number"
                            placeholder="0.00"
                            value={formData.courseValue}
                            onChange={e => setFormData({ ...formData, courseValue: e.target.value })}
                            required
                            style={{ fontSize: '16px', fontWeight: 600, color: '#1d1d1f' }}
                        />

                        <div style={{ margin: '20px 0', borderTop: '1px dashed #d2d2d7' }}></div>

                        <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#1d1d1f' }}>Pago Inicial (Abono)</h4>

                        <Input
                            label="Monto a Abonar Hoy"
                            type="number"
                            placeholder="0.00"
                            value={formData.initialPayment}
                            onChange={e => setFormData({ ...formData, initialPayment: e.target.value })}
                            required
                            style={{ fontWeight: 600, color: '#2E7D32' }}
                        />

                        <Select
                            label="Método de Pago"
                            value={formData.paymentMethod}
                            onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                            options={PAYMENT_METHODS}
                        />

                        <div style={{ padding: '16px', background: '#F2F2F7', borderRadius: '14px', marginTop: '20px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px', color: '#86868b' }}>
                                <span>Valor Curso</span>
                                <span>${Number(formData.courseValue).toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px', color: '#2E7D32', fontWeight: 500 }}>
                                <span>Abono Inicial</span>
                                <span>-${Number(formData.initialPayment).toLocaleString()}</span>
                            </div>
                            <div style={{ borderTop: '1px solid #d2d2d7', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 600 }}>
                                <span>Saldo Pendiente</span>
                                <span style={{ color: '#EF6C00' }}>
                                    ${(Number(formData.courseValue) - Number(formData.initialPayment)).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <Button type="submit" style={{ width: '100%' }}>
                            <Save size={18} /> Registrar Alumno
                        </Button>

                        <div style={{ marginTop: '16px', display: 'flex', gap: '8px', alignItems: 'start', fontSize: '12px', color: '#86868b' }}>
                            <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>El usuario recibirá un correo con sus credenciales de acceso automáticamente.</span>
                        </div>
                    </div>
                </div>

            </form>

            {/* Modal Create Tramitador */}
            {showTramitadorModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <div style={{ background: 'white', width: '400px', padding: '32px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Nueva Agencia / Referido</h3>
                        <Input
                            autoFocus
                            placeholder="Nombre de la Agencia"
                            value={newTramitadorName}
                            onChange={e => setNewTramitadorName(e.target.value)}
                        />
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                            <Button variant="outline" onClick={() => setShowTramitadorModal(false)}>Cancelar</Button>
                            <Button onClick={handleCreateTramitador}>Crear</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterStudent;
