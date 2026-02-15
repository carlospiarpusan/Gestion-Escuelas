import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car, AlertTriangle, CheckCircle, Clock, Plus, Filter, Search, ChevronRight, MoreVertical, Edit2, Trash2, X } from 'lucide-react';
import { MOCK_VEHICLES } from '../../data/mockFleet';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

const Fleet = () => {
    const [vehicles, setVehicles] = useState(MOCK_VEHICLES);
    const [searchTerm, setSearchTerm] = useState('');
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [formData, setFormData] = useState({
        brand: '', model: '', year: '', plate: '', km_current: 0, status: 'active'
    });

    const getStatusColor = (dateString, type = 'badge') => {
        const today = new Date();
        const expiryDate = new Date(dateString);
        const diffTime = expiryDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return type === 'badge' ? 'bg-red-100 text-red-600' : 'bg-red-500';
        if (diffDays < 30) return type === 'badge' ? 'bg-yellow-100 text-yellow-600' : 'bg-yellow-500';
        return type === 'badge' ? 'bg-green-100 text-green-600' : 'bg-green-500';
    };

    const getStatusText = (dateString) => {
        const today = new Date();
        const expiryDate = new Date(dateString);
        const diffTime = expiryDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return `Vencido hace ${Math.abs(diffDays)} días`;
        if (diffDays < 30) return `Vence en ${diffDays} días`;
        return 'Vigente';
    };

    const handleOpenNewModal = () => {
        setFormData({ brand: '', model: '', year: new Date().getFullYear(), plate: '', km_current: 0, status: 'active' });
        setIsNewModalOpen(true);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const newVehicle = {
            ...formData,
            id: Date.now(),
            image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400", // Placeholder
            soat_expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            techno_expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
        };
        setVehicles([newVehicle, ...vehicles]);
        setIsNewModalOpen(false);
    };

    const handleDelete = () => {
        setVehicles(vehicles.filter(v => v.id !== selectedVehicle.id));
        setIsDeleteModalOpen(false);
        setSelectedVehicle(null);
    };

    const filteredVehicles = vehicles.filter(v =>
        v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }} className="fade-in">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Flota Vehicular</h1>
                    <p style={{ color: '#86868b', fontSize: '17px' }}>Gestiona el estado y mantenimiento de tu parque automotor.</p>
                </div>
                <Button onClick={handleOpenNewModal}>
                    <Plus size={18} /> Nuevo Vehículo
                </Button>
            </header>

            {/* Stats Overview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                {[
                    { label: 'Total Vehículos', value: vehicles.length, icon: Car, color: '#0071e3', bg: 'rgba(0,113,227,0.1)' },
                    { label: 'Operativos', value: vehicles.filter(v => v.status === 'active').length, icon: CheckCircle, color: '#34C759', bg: 'rgba(52,199,89,0.1)' },
                    { label: 'En Taller', value: vehicles.filter(v => v.status === 'maintenance').length, icon: Clock, color: '#FF9500', bg: 'rgba(255,149,0,0.1)' },
                    {
                        label: 'Alertas Doc.',
                        value: vehicles.filter(v => getStatusColor(v.soat_expires, 'dot') !== 'bg-green-500' || getStatusColor(v.techno_expires, 'dot') !== 'bg-green-500').length,
                        icon: AlertTriangle, color: '#FF3B30', bg: 'rgba(255,59,48,0.1)'
                    }
                ].map((stat, i) => (
                    <div key={i} style={{ background: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                            <div style={{ padding: '10px', borderRadius: '12px', background: stat.bg, color: stat.color }}>
                                <stat.icon size={24} />
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#86868b' }}>{stat.label}</span>
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: 700, color: '#1d1d1f', marginLeft: '4px' }}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Search and Filter */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#86868b' }} />
                    <input
                        type="text"
                        placeholder="Buscar por placa o modelo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%', padding: '14px 14px 14px 48px', borderRadius: '12px',
                            border: 'none', background: 'white',
                            fontSize: '15px', color: '#1d1d1f', outline: 'none',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                        }}
                    />
                </div>
            </div>

            {/* Vehicles Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                {filteredVehicles.map((vehicle) => (
                    <motion.div
                        key={vehicle.id}
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            background: 'white', borderRadius: '24px', overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column'
                        }}
                    >
                        <div style={{ position: 'relative', height: '180px', background: '#f5f5f7' }}>
                            <img
                                src={vehicle.image}
                                alt={`${vehicle.brand} ${vehicle.model}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute', top: '16px', right: '16px',
                                padding: '6px 12px', borderRadius: '99px',
                                background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
                                fontSize: '12px', fontWeight: 600,
                                color: vehicle.status === 'active' ? '#34C759' : '#FF9500',
                                display: 'flex', alignItems: 'center', gap: '6px'
                            }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: vehicle.status === 'active' ? '#34C759' : '#FF9500' }}></div>
                                {vehicle.status === 'active' ? 'Operativo' : 'Mantenimiento'}
                            </div>
                        </div>

                        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div>
                                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1d1d1f', marginBottom: '4px' }}>{vehicle.brand} {vehicle.model}</h3>
                                    <p style={{ color: '#86868b', fontSize: '14px' }}>{vehicle.year} • {vehicle.km_current.toLocaleString()} km</p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                                    <div style={{
                                        background: '#F5F5F7', padding: '6px 12px', borderRadius: '8px',
                                        fontSize: '14px', fontFamily: 'monospace', fontWeight: 600, color: '#1d1d1f'
                                    }}>
                                        {vehicle.plate}
                                    </div>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button
                                            onClick={() => { setSelectedVehicle(vehicle); setIsDeleteModalOpen(true); }}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff3b30' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                                    <span style={{ color: '#86868b' }}>SOAT</span>
                                    <span style={{
                                        padding: '4px 10px', borderRadius: '6px', fontWeight: 500,
                                        ...(() => {
                                            const status = getStatusColor(vehicle.soat_expires, 'badge');
                                            return {
                                                background: status.includes('red') ? '#FFE5E5' : status.includes('yellow') ? '#FFF8E1' : '#E8F5E9',
                                                color: status.includes('red') ? '#D32F2F' : status.includes('yellow') ? '#F57F17' : '#2E7D32'
                                            };
                                        })()
                                    }}>
                                        {getStatusText(vehicle.soat_expires)}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                                    <span style={{ color: '#86868b' }}>Tecnomecánica</span>
                                    <span style={{
                                        padding: '4px 10px', borderRadius: '6px', fontWeight: 500,
                                        ...(() => {
                                            const status = getStatusColor(vehicle.techno_expires, 'badge');
                                            return {
                                                background: status.includes('red') ? '#FFE5E5' : status.includes('yellow') ? '#FFF8E1' : '#E8F5E9',
                                                color: status.includes('red') ? '#D32F2F' : status.includes('yellow') ? '#F57F17' : '#2E7D32'
                                            };
                                        })()
                                    }}>
                                        {getStatusText(vehicle.techno_expires)}
                                    </span>
                                </div>
                            </div>

                            <Link
                                to={`/dashboard/fleet/${vehicle.id}`}
                                style={{
                                    marginTop: 'auto',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    width: '100%', padding: '12px', borderRadius: '12px',
                                    background: '#F5F5F7', color: '#0071e3', textDecoration: 'none',
                                    fontWeight: 600, fontSize: '14px', transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#e5e5ea'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = '#F5F5F7'; }}
                            >
                                Ver Detalles <ChevronRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* New Vehicle Modal */}
            <AnimatePresence>
                {isNewModalOpen && (
                    <div
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                        }}
                        onClick={() => setIsNewModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{ background: 'white', width: '500px', padding: '32px', borderRadius: '24px' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Añadir Nuevo Vehículo</h3>
                            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <Input label="Marca" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} required />
                                    <Input label="Modelo" value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} required />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <Input label="Placa" value={formData.plate} onChange={e => setFormData({ ...formData, plate: e.target.value })} required />
                                    <Input label="Año" type="number" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} required />
                                </div>
                                <Input label="Kilometraje Inicial" type="number" value={formData.km_current} onChange={e => setFormData({ ...formData, km_current: parseInt(e.target.value) })} />

                                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                                    <Button variant="secondary" type="button" style={{ flex: 1 }} onClick={() => setIsNewModalOpen(false)}>Cancelar</Button>
                                    <Button type="submit" style={{ flex: 1 }}>Crear Registro</Button>
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
                            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>¿Eliminar Vehículo?</h3>
                            <p style={{ color: '#86868b', fontSize: '15px', marginBottom: '32px' }}>
                                Se eliminarán los registros de la placa <strong>{selectedVehicle?.plate}</strong>. Esta acción no se puede deshacer.
                            </p>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <Button variant="secondary" style={{ flex: 1 }} onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
                                <Button style={{ flex: 1, background: '#ff3b30' }} onClick={handleDelete}>Eliminar</Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Fleet;
