import { useState } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MaintenanceForm = ({ vehicleId, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        type: 'preventive',
        date: new Date().toISOString().split('T')[0],
        km_at_service: '',
        cost_parts: '',
        cost_labor: '',
        description: '',
        provider: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we would normally validate and send to backend
        onSave({
            ...formData,
            vehicle_id: vehicleId,
            id: Date.now().toString(), // Mock ID
            cost_parts: Number(formData.cost_parts),
            cost_labor: Number(formData.cost_labor),
            km_at_service: Number(formData.km_at_service)
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden"
            >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900">Registrar Mantenimiento</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                            <select
                                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="preventive">Preventivo</option>
                                <option value="corrective">Correctivo (Reparación)</option>
                                <option value="oil_change">Cambio de Aceite</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                            <input
                                type="date"
                                required
                                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kilometraje al Servicio</label>
                        <input
                            type="number"
                            required
                            placeholder="Ej: 45200"
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={formData.km_at_service}
                            onChange={e => setFormData({ ...formData, km_at_service: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción / Trabajo Realizado</label>
                        <textarea
                            rows="3"
                            required
                            placeholder="Ej: Cambio de pastillas de freno y rectificación..."
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor / Taller</label>
                        <input
                            type="text"
                            required
                            placeholder="Ej: Taller Juan Autos"
                            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={formData.provider}
                            onChange={e => setFormData({ ...formData, provider: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Costo Repuestos</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                <input
                                    type="number"
                                    required
                                    className="w-full pl-7 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    value={formData.cost_parts}
                                    onChange={e => setFormData({ ...formData, cost_parts: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Costo Mano de Obra</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                <input
                                    type="number"
                                    required
                                    className="w-full pl-7 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    value={formData.cost_labor}
                                    onChange={e => setFormData({ ...formData, cost_labor: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Save size={18} />
                            Guardar Registro
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default MaintenanceForm;
