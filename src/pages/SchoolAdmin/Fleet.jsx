import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car, AlertTriangle, CheckCircle, Clock, Plus, Filter, Search } from 'lucide-react';
import { MOCK_VEHICLES } from '../../data/mockFleet';

const Fleet = () => {
    const [vehicles] = useState(MOCK_VEHICLES);
    const [searchTerm, setSearchTerm] = useState('');

    const getStatusColor = (dateString) => {
        const today = new Date();
        const expiryDate = new Date(dateString);
        const diffTime = expiryDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'bg-red-500'; // Expired
        if (diffDays < 30) return 'bg-yellow-500'; // Expiring soon
        return 'bg-green-500'; // OK
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

    const filteredVehicles = vehicles.filter(v =>
        v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Flota Vehicular</h1>
                    <p className="text-gray-500">Gestiona el mantenimiento y documentación de tus vehículos.</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                    <Plus size={20} />
                    Nuevo Vehículo
                </button>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                        <Car size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Vehículos</p>
                        <p className="text-2xl font-bold">{vehicles.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Operativos</p>
                        <p className="text-2xl font-bold">{vehicles.filter(v => v.status === 'active').length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">En Mantenimiento</p>
                        <p className="text-2xl font-bold">{vehicles.filter(v => v.status === 'maintenance').length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Alertas Doc.</p>
                        <p className="text-2xl font-bold">
                            {vehicles.filter(v =>
                                getStatusColor(v.soat_expires) !== 'bg-green-500' ||
                                getStatusColor(v.techno_expires) !== 'bg-green-500'
                            ).length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por placa o modelo..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 text-gray-600 hover:bg-gray-50">
                    <Filter size={20} />
                    Filtros
                </button>
            </div>

            {/* Vehicles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                    <motion.div
                        key={vehicle.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <div className="h-40 bg-gray-200 relative">
                            <img
                                src={vehicle.image}
                                alt={`${vehicle.brand} ${vehicle.model}`}
                                className="w-full h-full object-cover"
                            />
                            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${vehicle.status === 'active' ? 'bg-green-500' : 'bg-orange-500'}`}>
                                {vehicle.status === 'active' ? 'Operativo' : 'Mantenimiento'}
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{vehicle.brand} {vehicle.model}</h3>
                                    <p className="text-gray-500">{vehicle.year} • {vehicle.km_current.toLocaleString()} km</p>
                                </div>
                                <div className="bg-gray-100 px-3 py-1 rounded-lg text-lg font-mono font-bold text-gray-700">
                                    {vehicle.plate}
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                {/* SOAT Status */}
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">SOAT</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500 text-xs">{getStatusText(vehicle.soat_expires)}</span>
                                        <div className={`w-3 h-3 rounded-full ${getStatusColor(vehicle.soat_expires)}`}></div>
                                    </div>
                                </div>
                                {/* Tecno Status */}
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Tecnomecánica</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500 text-xs">{getStatusText(vehicle.techno_expires)}</span>
                                        <div className={`w-3 h-3 rounded-full ${getStatusColor(vehicle.techno_expires)}`}></div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                to={`/dashboard/fleet/${vehicle.id}`}
                                className="block w-full text-center py-2 border border-gray-200 rounded-lg text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                            >
                                Ver Detalles y Mantenimiento
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Fleet;
