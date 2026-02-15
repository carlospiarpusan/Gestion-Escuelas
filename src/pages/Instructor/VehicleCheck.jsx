import { useState } from 'react';
import { Car, CheckCircle, AlertTriangle, Camera, Navigation, Fuel } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/UI/Button';
import Select from '../../components/UI/Select';
import Input from '../../components/UI/Input';

const MOCK_VEHICLES = [
    { value: 'KIA-001', label: 'Kia Picanto (AB-123-CD)' },
    { value: 'HYU-002', label: 'Hyundai Grand i10 (EF-456-GH)' },
    { value: 'TOY-003', label: 'Toyota Yaris (IJ-789-KL)' },
];

const VehicleCheck = () => {
    const [step, setStep] = useState('select'); // select, check-in, active, check-out, summary
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [checkInData, setCheckInData] = useState({ mileage: '', fuel: '100', damage: false, notes: '' });
    const [checkOutData, setCheckOutData] = useState({ mileage: '', fuel: '', damage: false, notes: '' });

    const handleCheckIn = (e) => {
        e.preventDefault();
        setStep('active');
    };

    const handleCheckOut = (e) => {
        e.preventDefault();
        setStep('summary');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1d1d1f' }}>Control Vehicular</h1>
                <p style={{ color: '#86868b', fontSize: '16px' }}>Registro de uso y estado de unidades.</p>
            </div>

            <motion.div
                layout
                style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}
            >
                {step === 'select' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', background: '#E3F2FD', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#0071e3' }}>
                                <Car size={40} />
                            </div>
                            <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Selecciona tu Unidad</h2>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <Select
                                label="Vehículo Asignado"
                                value={selectedVehicle}
                                onChange={e => setSelectedVehicle(e.target.value)}
                                options={[
                                    { value: '', label: 'Seleccionar vehículo...' },
                                    ...MOCK_VEHICLES
                                ]}
                            />
                        </div>

                        <Button
                            style={{ width: '100%', justifyContent: 'center' }}
                            disabled={!selectedVehicle}
                            onClick={() => setStep('check-in')}
                        >
                            Iniciar Check-in
                        </Button>
                    </motion.div>
                )}

                {step === 'check-in' && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CheckCircle size={24} color="#34C759" /> Check-in Inicial
                        </h2>

                        <form onSubmit={handleCheckIn} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Input
                                label="Kilometraje Actual"
                                type="number"
                                placeholder="Ej. 45050"
                                value={checkInData.mileage}
                                onChange={e => setCheckInData({ ...checkInData, mileage: e.target.value })}
                                required
                                icon={Navigation}
                            />

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: '#1d1d1f' }}>Nivel de Combustible</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    {['25', '50', '75', '100'].map(level => (
                                        <button
                                            key={level}
                                            type="button"
                                            onClick={() => setCheckInData({ ...checkInData, fuel: level })}
                                            style={{
                                                flex: 1, padding: '10px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                                                background: checkInData.fuel === level ? '#0071e3' : '#f5f5f7',
                                                color: checkInData.fuel === level ? 'white' : '#1d1d1f',
                                                fontWeight: 600, transition: 'all 0.2s'
                                            }}
                                        >
                                            {level}%
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ background: '#FFF3E0', padding: '16px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'start' }}>
                                <AlertTriangle size={20} color="#EF6C00" style={{ marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#EF6C00', marginBottom: '4px' }}>¿Reportar Daños?</div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#1d1d1f', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={checkInData.damage}
                                            onChange={e => setCheckInData({ ...checkInData, damage: e.target.checked })}
                                        />
                                        La unidad presenta daños nuevos
                                    </label>
                                </div>
                            </div>

                            <Button type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                                Iniciar Turno
                            </Button>
                        </form>
                    </motion.div>
                )}

                {step === 'active' && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid #34C759', padding: '10px', margin: '0 auto 24px', position: 'relative' }}>
                            <div style={{ width: '100%', height: '100%', background: '#E8F5E9', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#2E7D32' }}>
                                <Car size={32} style={{ marginBottom: '4px' }} />
                                <span style={{ fontSize: '12px', fontWeight: 700 }}>EN USO</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: '0', right: '0', background: '#34C759', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <CheckCircle size={20} />
                            </div>
                        </div>

                        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Turno Activo</h2>
                        <p style={{ fontSize: '16px', color: '#86868b', marginBottom: '32px' }}>
                            Unidad: <strong>{MOCK_VEHICLES.find(v => v.value === selectedVehicle)?.label}</strong><br />
                            Inicio: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>

                        <Button
                            variant="danger"
                            style={{ width: '100%', justifyContent: 'center' }}
                            onClick={() => setStep('check-out')}
                        >
                            Finalizar Turno
                        </Button>
                    </motion.div>
                )}

                {step === 'check-out' && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <LogOutIcon /> Check-out Final
                        </h2>

                        <form onSubmit={handleCheckOut} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Input
                                label="Kilometraje Final"
                                type="number"
                                placeholder={`Mayor a ${checkInData.mileage}`}
                                value={checkOutData.mileage}
                                onChange={e => setCheckOutData({ ...checkOutData, mileage: e.target.value })}
                                required
                                icon={Navigation}
                            />
                            <div style={{ background: '#F5F5F7', padding: '16px', borderRadius: '12px', fontSize: '14px', color: '#86868b' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span>Km Inicial:</span>
                                    <strong>{checkInData.mileage}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Recorrido:</span>
                                    <strong>{checkOutData.mileage ? checkOutData.mileage - checkInData.mileage : 0} km</strong>
                                </div>
                            </div>
                            <Button type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                                Confirmar y Cerrar
                            </Button>
                        </form>
                    </motion.div>
                )}

                {step === 'summary' && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
                        <div style={{ width: '80px', height: '80px', background: '#34C759', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'white', boxShadow: '0 10px 30px rgba(52, 199, 89, 0.3)' }}>
                            <CheckCircle size={40} />
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 12px', color: '#1d1d1f' }}>¡Turno Finalizado!</h2>
                        <p style={{ color: '#86868b', fontSize: '15px', marginBottom: '32px' }}>
                            Has registrado correctamente el uso del vehículo.<br />
                            Recorrido total: <strong>{checkOutData.mileage - checkInData.mileage} km</strong>
                        </p>
                        <Button variant="ghost" onClick={() => {
                            setStep('select');
                            setSelectedVehicle('');
                            setCheckInData({ mileage: '', fuel: '100', damage: false, notes: '' });
                            setCheckOutData({ mileage: '', fuel: '', damage: false, notes: '' });
                        }}>
                            Volver al Inicio
                        </Button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

const LogOutIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);

export default VehicleCheck;
