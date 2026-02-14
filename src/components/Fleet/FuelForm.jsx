import { useState } from 'react';
import { X, Save, Upload, FileSpreadsheet } from 'lucide-react';
import { motion } from 'framer-motion';

const FuelForm = ({ vehicleId, onClose, onSave }) => {
    const [mode, setMode] = useState('manual'); // 'manual' or 'template'
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        km_at_fueling: '',
        gallons: '',
        cost_total: '',
        is_full_tank: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            vehicle_id: vehicleId,
            id: Date.now().toString(),
            gallons: Number(formData.gallons),
            cost_total: Number(formData.cost_total),
            km_at_fueling: Number(formData.km_at_fueling)
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
                    <h2 className="text-xl font-bold text-gray-900">Registrar Combustible</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-4 border-b border-gray-100 flex gap-2 justify-center bg-gray-50/50">
                    <button
                        onClick={() => setMode('manual')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${mode === 'manual' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                        Registro Manual
                    </button>
                    <button
                        onClick={() => setMode('template')}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${mode === 'template' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                        Carga Masiva (Plantilla)
                    </button>
                </div>

                {mode === 'manual' ? (
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kilometraje Actual</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="Ej: 45300"
                                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    value={formData.km_at_fueling}
                                    onChange={e => setFormData({ ...formData, km_at_fueling: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Galones</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    placeholder="Ej: 8.5"
                                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    value={formData.gallons}
                                    onChange={e => setFormData({ ...formData, gallons: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Costo Total</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                    <input
                                        type="number"
                                        required
                                        placeholder="Ej: 120000"
                                        className="w-full pl-7 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={formData.cost_total}
                                        onChange={e => setFormData({ ...formData, cost_total: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <input
                                type="checkbox"
                                id="fullTank"
                                checked={formData.is_full_tank}
                                onChange={e => setFormData({ ...formData, is_full_tank: e.target.checked })}
                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="fullTank" className="text-sm text-gray-700">Tanque Lleno (Full)</label>
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
                                Guardar
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="p-8 text-center space-y-6">
                        <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-green-800 text-sm">
                            <p className="font-semibold mb-1">Instrucciones</p>
                            Sube el archivo Excel/CSV generado por la estación de servicio para cargar múltiples registros a la vez.
                        </div>

                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:bg-gray-50 transition-colors cursor-pointer group">
                            <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400 group-hover:text-green-500 transition-colors" />
                            <p className="mt-2 text-sm text-gray-600 font-medium group-hover:text-gray-900">
                                Arrastra tu archivo aquí o haz clic para buscar
                            </p>
                            <p className="text-xs text-gray-400 mt-1">Soporta .xlsx, .csv</p>
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
                                disabled
                                className="px-6 py-2 bg-gray-300 text-white rounded-lg font-medium cursor-not-allowed flex items-center gap-2"
                            >
                                <Upload size={18} />
                                Procesar Archivo
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default FuelForm;
