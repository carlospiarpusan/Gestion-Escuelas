import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Tool, Fuel, Save, AlertCircle, Calendar, Wrench, DollarSign } from 'lucide-react';
import { MOCK_VEHICLES, MOCK_MAINTENANCE_LOGS, MOCK_FUEL_LOGS } from '../../data/mockFleet';

const VehicleDetails = () => {
    const { id } = useParams();
    const vehicle = MOCK_VEHICLES.find(v => v.id === id);
    const [activeTab, setActiveTab] = useState('maintenance');

    // Filter logs for this vehicle
    const maintenanceLogs = MOCK_MAINTENANCE_LOGS.filter(l => l.vehicle_id === id);
    const fuelLogs = MOCK_FUEL_LOGS.filter(l => l.vehicle_id === id);

    if (!vehicle) return <div>Vehículo no encontrado</div>;

    return (
        <div className="p-8">
            <Link to="/dashboard/fleet" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                <ArrowLeft size={20} /> Volver a la Flota
            </Link>

            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{vehicle.brand} {vehicle.model} - {vehicle.plate}</h1>
                    <p className="text-gray-500">Kilometraje Actual: <span className="font-mono font-bold text-gray-800">{vehicle.km_current.toLocaleString()} km</span></p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-100 font-medium border border-orange-200">
                        <Wrench size={20} />
                        Registrar Mantenimiento
                    </button>
                    <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-100 font-medium border border-blue-200">
                        <Fuel size={20} />
                        Registrar Tanqueo
                    </button>
                    <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800">
                        <Save size={20} />
                        Editar Info
                    </button>
                </div>
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Próxima Tecnomecánica</h3>
                        <Calendar className="text-gray-400" size={20} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{vehicle.techno_expires}</p>
                    <p className="text-sm text-yellow-600 mt-2 flex items-center gap-1">
                        <AlertCircle size={14} /> Atento a vencimiento
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Gasto Combustible (Mes)</h3>
                        <Fuel className="text-blue-400" size={20} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">$273,000</p>
                    <p className="text-sm text-gray-400 mt-2">Promedio: 45 km/gal</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Gasto Mantenimiento (Año)</h3>
                        <Wrench className="text-orange-400" size={20} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">$1,450,000</p>
                    <p className="text-sm text-gray-400 mt-2">2 Reparaciones, 3 Aceites</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
                <div className="border-b border-gray-100 flex">
                    <button
                        onClick={() => setActiveTab('maintenance')}
                        className={`px-8 py-4 font-medium text-sm transition-colors relative ${activeTab === 'maintenance' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Historial Mantenimiento
                        {activeTab === 'maintenance' && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('fuel')}
                        className={`px-8 py-4 font-medium text-sm transition-colors relative ${activeTab === 'fuel' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Historial de Combustible
                        {activeTab === 'fuel' && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('docs')}
                        className={`px-8 py-4 font-medium text-sm transition-colors relative ${activeTab === 'docs' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Documentación
                        {activeTab === 'docs' && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'maintenance' && (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                        <th className="pb-4">Fecha</th>
                                        <th className="pb-4">Tipo</th>
                                        <th className="pb-4">Descripción</th>
                                        <th className="pb-4">Taller</th>
                                        <th className="pb-4 text-right">Repuestos</th>
                                        <th className="pb-4 text-right">M. Obra</th>
                                        <th className="pb-4 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {maintenanceLogs.map(log => (
                                        <tr key={log.id} className="text-sm">
                                            <td className="py-4 text-gray-900">{log.date}</td>
                                            <td className="py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${log.type === 'oil_change' ? 'bg-blue-100 text-blue-700' :
                                                        log.type === 'repair' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {log.type === 'oil_change' ? 'Cambio Aceite' : 'Reparación'}
                                                </span>
                                            </td>
                                            <td className="py-4 text-gray-600 max-w-[300px]">{log.description}</td>
                                            <td className="py-4 text-gray-500">{log.provider}</td>
                                            <td className="py-4 text-right text-gray-900">${log.cost_parts.toLocaleString()}</td>
                                            <td className="py-4 text-right text-gray-900">${log.cost_labor.toLocaleString()}</td>
                                            <td className="py-4 text-right font-medium text-gray-900">${(log.cost_parts + log.cost_labor).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    {maintenanceLogs.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="py-8 text-center text-gray-400">No hay registros de mantenimiento.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'fuel' && (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                        <th className="pb-4">Fecha</th>
                                        <th className="pb-4">Kilometraje</th>
                                        <th className="pb-4 text-right">Galones</th>
                                        <th className="pb-4 text-center">Tanque Lleno</th>
                                        <th className="pb-4 text-right">Costo Total</th>
                                        <th className="pb-4 text-right">Costo/Galón</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {fuelLogs.map(log => (
                                        <tr key={log.id} className="text-sm">
                                            <td className="py-4 text-gray-900">{log.date}</td>
                                            <td className="py-4 font-mono text-gray-600">{log.km_at_fueling.toLocaleString()}</td>
                                            <td className="py-4 text-right text-gray-900">{log.gallons}</td>
                                            <td className="py-4 text-center">
                                                {log.is_full_tank ? <CheckCircle size={16} className="text-green-500 inline" /> : '-'}
                                            </td>
                                            <td className="py-4 text-right font-medium text-gray-900">${log.cost_total.toLocaleString()}</td>
                                            <td className="py-4 text-right text-gray-500">${Math.round(log.cost_total / log.gallons).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;
