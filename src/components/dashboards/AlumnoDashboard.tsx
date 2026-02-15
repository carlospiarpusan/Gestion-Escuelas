import { useState } from 'react';
import { useStore } from '../../store';
import { CreditCard, FileText, BookOpen, CheckCircle, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function AlumnoDashboard() {
  const [activeTab, setActiveTab] = useState<'pagos' | 'examen'>('pagos');
  const [showPagoModal, setShowPagoModal] = useState(false);
  const [formData, setFormData] = useState({
    monto: '',
    concepto: '',
    metodoPago: 'efectivo' as 'efectivo' | 'tarjeta' | 'transferencia',
  });

  const currentUser = useStore((state) => state.currentUser);
  const pagos = useStore((state) => state.pagos);
  const escuelas = useStore((state) => state.escuelas);
  const clases = useStore((state) => state.clases);
  const resultadosExamen = useStore((state) => state.resultadosExamen);
  const addPago = useStore((state) => state.addPago);

  const escuela = escuelas.find((e) => e.id === currentUser?.escuelaId);
  const misPagos = pagos.filter((p) => p.alumnoId === currentUser?.id);
  const misClases = clases.filter((c) => c.alumnoId === currentUser?.id);
  const misResultados = resultadosExamen.filter((r) => r.alumnoId === currentUser?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPago({
      alumnoId: currentUser!.id,
      escuelaId: currentUser!.escuelaId!,
      monto: parseFloat(formData.monto),
      concepto: formData.concepto,
      metodoPago: formData.metodoPago,
      estado: 'pendiente',
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      monto: '',
      concepto: '',
      metodoPago: 'efectivo',
    });
    setShowPagoModal(false);
  };

  const totalPagado = misPagos
    .filter((p) => p.estado === 'pagado')
    .reduce((sum, p) => sum + p.monto, 0);

  const totalPendiente = misPagos
    .filter((p) => p.estado === 'pendiente')
    .reduce((sum, p) => sum + p.monto, 0);

  const clasesCompletadas = misClases.filter((c) => c.estado === 'completada').length;
  const ultimoExamen = misResultados.sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  )[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Panel de Alumno</h2>
        <p className="text-gray-600 mt-1">{escuela?.nombre}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total pagado</p>
              <p className="text-2xl font-bold text-gray-900">{totalPagado.toFixed(2)}€</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pendiente</p>
              <p className="text-2xl font-bold text-gray-900">{totalPendiente.toFixed(2)}€</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Clases completadas</p>
              <p className="text-2xl font-bold text-gray-900">{clasesCompletadas}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Exámenes realizados</p>
              <p className="text-2xl font-bold text-gray-900">{misResultados.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('pagos')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'pagos'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Mis Pagos
          </button>
          <button
            onClick={() => setActiveTab('examen')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'examen'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Simulacro de Examen
          </button>
        </div>

        <div className="mt-4">
          {activeTab === 'pagos' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Historial de Pagos</h3>
                <button
                  onClick={() => setShowPagoModal(true)}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Registrar Pago
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Fecha
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Concepto
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Método
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Monto
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {misPagos
                      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                      .map((pago) => (
                        <tr key={pago.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {format(new Date(pago.fecha), 'dd MMM yyyy', { locale: es })}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{pago.concepto}</td>
                          <td className="px-4 py-3">
                            <span className="text-sm capitalize">{pago.metodoPago}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-semibold text-gray-900">
                              {pago.monto.toFixed(2)}€
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                pago.estado === 'pagado'
                                  ? 'bg-green-100 text-green-700'
                                  : pago.estado === 'pendiente'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {pago.estado === 'pagado'
                                ? 'Pagado'
                                : pago.estado === 'pendiente'
                                ? 'Pendiente'
                                : 'Cancelado'}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'examen' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Simulacro de Examen Teórico</h3>
                <button
                  onClick={() => window.location.hash = '#/examen'}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Iniciar Simulacro
                </button>
              </div>

              {ultimoExamen && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Último examen realizado</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(ultimoExamen.fecha), 'dd MMM yyyy HH:mm', { locale: es })}
                      </p>
                      <p className="text-sm mt-1">
                        Puntuación:{' '}
                        <span
                          className={`font-bold ${
                            ultimoExamen.aprobado ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {ultimoExamen.puntuacion}% -{' '}
                          {ultimoExamen.aprobado ? 'APROBADO' : 'SUSPENDIDO'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Fecha
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Preguntas
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Tiempo
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Puntuación
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Resultado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {misResultados
                      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                      .map((resultado) => (
                        <tr key={resultado.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {format(new Date(resultado.fecha), 'dd MMM yyyy HH:mm', {
                              locale: es,
                            })}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {resultado.preguntas.length}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {Math.floor(resultado.tiempoTotal / 60)}m {resultado.tiempoTotal % 60}s
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-semibold text-gray-900">
                              {resultado.puntuacion}%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                resultado.aprobado
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {resultado.aprobado ? 'APROBADO' : 'SUSPENDIDO'}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {showPagoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Registrar Pago</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Concepto</label>
                <input
                  type="text"
                  className="input"
                  value={formData.concepto}
                  onChange={(e) => setFormData({ ...formData, concepto: e.target.value })}
                  placeholder="Matrícula, clase práctica, etc."
                  required
                />
              </div>

              <div>
                <label className="label">Monto (€)</label>
                <input
                  type="number"
                  step="0.01"
                  className="input"
                  value={formData.monto}
                  onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="label">Método de pago</label>
                <select
                  className="input"
                  value={formData.metodoPago}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      metodoPago: e.target.value as 'efectivo' | 'tarjeta' | 'transferencia',
                    })
                  }
                >
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta</option>
                  <option value="transferencia">Transferencia</option>
                </select>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                El pago quedará pendiente hasta que sea confirmado por la secretaría.
              </div>

              <div className="flex gap-2 justify-end">
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
