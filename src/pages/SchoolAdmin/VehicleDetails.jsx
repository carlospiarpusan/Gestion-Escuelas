import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Fuel, Save, AlertCircle, Calendar, Wrench, DollarSign, CheckCircle, FileText } from 'lucide-react';
import { MOCK_VEHICLES, MOCK_MAINTENANCE_LOGS, MOCK_FUEL_LOGS } from '../../data/mockFleet';
import MaintenanceForm from '../../components/Fleet/MaintenanceForm';
import FuelForm from '../../components/Fleet/FuelForm';

const VehicleDetails = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('maintenance');
    const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
    const [showFuelForm, setShowFuelForm] = useState(false);

    // In a real app, these would come from an API/Context
    const [vehicle, setVehicle] = useState(MOCK_VEHICLES.find(v => v.id === id));
    const [maintenanceLogs, setMaintenanceLogs] = useState(MOCK_MAINTENANCE_LOGS.filter(l => l.vehicle_id === id));
    const [fuelLogs, setFuelLogs] = useState(MOCK_FUEL_LOGS.filter(l => l.vehicle_id === id));

    if (!vehicle) return <div>Vehículo no encontrado</div>;

    const handleMaintenanceSave = (newLog) => {
        setMaintenanceLogs([newLog, ...maintenanceLogs]);
        // Update vehicle KM if the log has higher KM
        if (newLog.km_at_service > vehicle.km_current) {
            setVehicle({ ...vehicle, km_current: newLog.km_at_service });
        }
    };

    const handleFuelSave = (newLog) => {
        setFuelLogs([newLog, ...fuelLogs]);
        if (newLog.km_at_fueling > vehicle.km_current) {
            setVehicle({ ...vehicle, km_current: newLog.km_at_fueling });
        }
    };

    const handleEditInfo = () => {
        alert("Edición de vehículo próximamente.");
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }} className="fade-in">
            <Link to="/dashboard/fleet" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#86868b', marginBottom: '24px', textDecoration: 'none', fontWeight: 500 }}>
                <ArrowLeft size={20} /> Volver a la Flota
            </Link>

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                        <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1f', margin: 0 }}>{vehicle.brand} {vehicle.model}</h1>
                        <span style={{ padding: '4px 12px', background: '#e5e5ea', borderRadius: '6px', fontFamily: 'monospace', fontWeight: 600, fontSize: '16px' }}>{vehicle.plate}</span>
                    </div>
                    <p style={{ color: '#86868b', fontSize: '17px' }}>
                        Kilometraje Actual: <span style={{ fontWeight: 600, color: '#1d1d1f' }}>{vehicle.km_current.toLocaleString()} km</span>
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={() => setShowMaintenanceForm(true)}
                        style={{
                            background: '#FFF8E1', color: '#F57F17', border: 'none', padding: '10px 20px',
                            borderRadius: '980px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        <Wrench size={18} />
                        Registrar Mantenimiento
                    </button>
                    <button
                        onClick={() => setShowFuelForm(true)}
                        style={{
                            background: '#E3F2FD', color: '#0071e3', border: 'none', padding: '10px 20px',
                            borderRadius: '980px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        <Fuel size={18} />
                        Registrar Tanqueo
                    </button>
                    <button
                        onClick={handleEditInfo}
                        style={{
                            background: '#e5e5ea', color: '#1d1d1f', border: 'none', padding: '10px 20px',
                            borderRadius: '980px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        <Save size={18} />
                        Editar Info
                    </button>
                </div>
            </header>

            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#86868b' }}>Próxima Tecnomecánica</h3>
                        <Calendar size={20} color="#86868b" />
                    </div>
                    <p style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0' }}>{vehicle.techno_expires}</p>
                    <p style={{ fontSize: '13px', color: '#FF9500', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <AlertCircle size={14} /> Atento a vencimiento
                    </p>
                </div>
                <div style={{ background: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#86868b' }}>Gasto Combustible (Mes)</h3>
                        <Fuel size={20} color="#0071e3" />
                    </div>
                    <p style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0' }}>$273,000</p>
                    <p style={{ fontSize: '13px', color: '#86868b' }}>Promedio: 45 km/gal</p>
                </div>
                <div style={{ background: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#86868b' }}>Gasto Mantenimiento (Año)</h3>
                        <Wrench size={20} color="#FF9500" />
                    </div>
                    <p style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0' }}>$1,450,000</p>
                    <p style={{ fontSize: '13px', color: '#86868b' }}>2 Reparaciones, 3 Aceites</p>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', overflow: 'hidden', minHeight: '500px' }}>
                <div style={{ borderBottom: '1px solid #f0f0f0', display: 'flex', padding: '0 24px' }}>
                    {[
                        { id: 'maintenance', label: 'Historial Mantenimiento' },
                        { id: 'fuel', label: 'Historial de Combustible' },
                        { id: 'docs', label: 'Documentación' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '20px 0', marginRight: '32px', fontSize: '15px', fontWeight: activeTab === tab.id ? 600 : 500,
                                color: activeTab === tab.id ? '#0071e3' : '#86868b',
                                borderBottom: activeTab === tab.id ? '2px solid #0071e3' : '2px solid transparent',
                                background: 'none', border: 'none', cursor: 'pointer', borderBottomWidth: '2px', outline: 'none',
                                transition: 'color 0.2s'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div style={{ padding: '32px' }}>
                    {/* Maintenance Table */}
                    {activeTab === 'maintenance' && (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', fontSize: '13px', color: '#86868b', borderBottom: '1px solid #f0f0f0' }}>
                                    <th style={{ padding: '12px 0 20px', fontWeight: 500 }}>FECHA</th>
                                    <th style={{ padding: '12px 0 20px', fontWeight: 500 }}>TIPO</th>
                                    <th style={{ padding: '12px 0 20px', fontWeight: 500 }}>DESCRIPCIÓN</th>
                                    <th style={{ padding: '12px 0 20px', fontWeight: 500 }}>TALLER</th>
                                    <th style={{ padding: '12px 0 20px', textAlign: 'right', fontWeight: 500 }}>TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {maintenanceLogs.map(log => (
                                    <tr key={log.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                        <td style={{ padding: '20px 0', fontSize: '15px' }}>{log.date}</td>
                                        <td style={{ padding: '20px 0' }}>
                                            <span style={{
                                                padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                                                background: log.type === 'oil_change' ? '#E3F2FD' : '#FFF3E0',
                                                color: log.type === 'oil_change' ? '#0071e3' : '#E65100'
                                            }}>
                                                {log.type === 'oil_change' ? 'Cambio Aceite' : 'Reparación'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '20px 0', fontSize: '15px', color: '#424245' }}>{log.description}</td>
                                        <td style={{ padding: '20px 0', fontSize: '15px', color: '#86868b' }}>{log.provider}</td>
                                        <td style={{ padding: '20px 0', textAlign: 'right', fontWeight: 600 }}>${(log.cost_parts + log.cost_labor).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Fuel Table */}
                    {activeTab === 'fuel' && (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', fontSize: '13px', color: '#86868b', borderBottom: '1px solid #f0f0f0' }}>
                                    <th style={{ padding: '12px 0 20px', fontWeight: 500 }}>FECHA</th>
                                    <th style={{ padding: '12px 0 20px', fontWeight: 500 }}>KILOMETRAJE</th>
                                    <th style={{ padding: '12px 0 20px', textAlign: 'right', fontWeight: 500 }}>GALONES</th>
                                    <th style={{ padding: '12px 0 20px', textAlign: 'center', fontWeight: 500 }}>FULL</th>
                                    <th style={{ padding: '12px 0 20px', textAlign: 'right', fontWeight: 500 }}>COSTO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fuelLogs.map(log => (
                                    <tr key={log.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                        <td style={{ padding: '20px 0', fontSize: '15px' }}>{log.date}</td>
                                        <td style={{ padding: '20px 0', fontSize: '15px', fontFamily: 'monospace' }}>{log.km_at_fueling.toLocaleString()}</td>
                                        <td style={{ padding: '20px 0', textAlign: 'right', fontSize: '15px' }}>{log.gallons}</td>
                                        <td style={{ padding: '20px 0', textAlign: 'center' }}>
                                            {log.is_full_tank ? <CheckCircle size={16} color="#34C759" /> : '-'}
                                        </td>
                                        <td style={{ padding: '20px 0', textAlign: 'right', fontWeight: 600 }}>${log.cost_total.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Docs Tab */}
                    {activeTab === 'docs' && (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                                <div style={{ border: '1px solid #e5e5e5', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '40px', height: '40px', background: '#FF3B30', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>SOAT Digital</div>
                                        <div style={{ fontSize: '12px', color: '#86868b' }}>Vence: {vehicle.soat_expires}</div>
                                    </div>
                                </div>
                                <div style={{ border: '1px solid #e5e5e5', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '40px', height: '40px', background: '#34C759', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>Tecnomecánica</div>
                                        <div style={{ fontSize: '12px', color: '#86868b' }}>Vence: {vehicle.techno_expires}</div>
                                    </div>
                                </div>
                                <div style={{ border: '1px solid #e5e5e5', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '40px', height: '40px', background: '#0071e3', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>Tarjeta Propiedad</div>
                                        <div style={{ fontSize: '12px', color: '#86868b' }}>Permanente</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {showMaintenanceForm && (
                    <MaintenanceForm
                        vehicleId={id}
                        onClose={() => setShowMaintenanceForm(false)}
                        onSave={handleMaintenanceSave}
                    />
                )}
                {showFuelForm && (
                    <FuelForm
                        vehicleId={id}
                        onClose={() => setShowFuelForm(false)}
                        onSave={handleFuelSave}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default VehicleDetails;
