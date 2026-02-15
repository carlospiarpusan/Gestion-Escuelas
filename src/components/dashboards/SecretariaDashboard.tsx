import { useStore } from '../../store';
import { CheckCircle, Clock, DollarSign, Users } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function SecretariaDashboard() {
  const currentUser = useStore((state) => state.currentUser);
  const escuelas = useStore((state) => state.escuelas);
  const pagos = useStore((state) => state.pagos);
  const users = useStore((state) => state.users);
  const clases = useStore((state) => state.clases);
  const updatePago = useStore((state) => state.updatePago);

  const escuela = escuelas.find((e) => e.id === currentUser?.escuelaId);
  const pagosPendientes = pagos.filter(
    (p) => p.escuelaId === currentUser?.escuelaId && p.estado === 'pendiente'
  );
  const todosLosPagos = pagos.filter((p) => p.escuelaId === currentUser?.escuelaId);
  const alumnos = users.filter((u) => u.escuelaId === currentUser?.escuelaId && u.role === 'alumno');
  const clasesHoy = clases.filter((c) => {
    const fecha = new Date(c.fecha);
    const hoy = new Date();
    return (
      c.escuelaId === currentUser?.escuelaId &&
      fecha.toDateString() === hoy.toDateString()
    );
  });

  const aprobarPago = (id: string) => {
    updatePago(id, { estado: 'pagado' });
  };

  const rechazarPago = (id: string) => {
    if (confirm('¿Estás seguro de rechazar este pago?')) {
      updatePago(id, { estado: 'cancelado' });
    }
  };

  const totalRecaudado = todosLosPagos
    .filter((p) => p.estado === 'pagado')
    .reduce((sum, p) => sum + p.monto, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Panel de Secretaría</h2>
        <p className="text-gray-600 mt-1">{escuela?.nombre}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pagos pendientes</p>
              <p className="text-2xl font-bold text-gray-900">{pagosPendientes.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total recaudado</p>
              <p className="text-2xl font-bold text-gray-900">{totalRecaudado.toFixed(2)}€</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total alumnos</p>
              <p className="text-2xl font-bold text-gray-900">{alumnos.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Clases hoy</p>
              <p className="text-2xl font-bold text-gray-900">{clasesHoy.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Pagos Pendientes de Aprobación</h3>
        {pagosPendientes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>No hay pagos pendientes</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Alumno
                  </th>
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
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pagosPendientes.map((pago) => {
                  const alumno = users.find((u) => u.id === pago.alumnoId);
                  return (
                    <tr key={pago.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900">
                            {alumno?.nombre} {alumno?.apellido}
                          </p>
                          <p className="text-sm text-gray-500">{alumno?.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {format(new Date(pago.fecha), 'dd MMM yyyy', { locale: es })}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{pago.concepto}</td>
                      <td className="px-4 py-3">
                        <span className="text-sm capitalize">{pago.metodoPago}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-gray-900">{pago.monto.toFixed(2)}€</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => aprobarPago(pago.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                          >
                            Aprobar
                          </button>
                          <button
                            onClick={() => rechazarPago(pago.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                          >
                            Rechazar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Historial de Pagos</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Alumno</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Fecha</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Concepto</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Monto</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {todosLosPagos
                .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                .slice(0, 10)
                .map((pago) => {
                  const alumno = users.find((u) => u.id === pago.alumnoId);
                  return (
                    <tr key={pago.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {alumno?.nombre} {alumno?.apellido}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {format(new Date(pago.fecha), 'dd MMM yyyy', { locale: es })}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{pago.concepto}</td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-gray-900">{pago.monto.toFixed(2)}€</span>
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
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
