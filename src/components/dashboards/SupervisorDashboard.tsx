import { useStore } from '../../store';
import { CheckCircle, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function SupervisorDashboard() {
  const currentUser = useStore((state) => state.currentUser);
  const escuelas = useStore((state) => state.escuelas);
  const registrosHoras = useStore((state) => state.registrosHoras);
  const users = useStore((state) => state.users);
  const clases = useStore((state) => state.clases);
  const aprobarRegistroHoras = useStore((state) => state.aprobarRegistroHoras);

  const escuela = escuelas.find((e) => e.id === currentUser?.escuelaId);
  const registrosPendientes = registrosHoras.filter(
    (r) => r.escuelaId === currentUser?.escuelaId && !r.aprobado
  );
  const todosLosRegistros = registrosHoras.filter(
    (r) => r.escuelaId === currentUser?.escuelaId
  );
  const instructores = users.filter(
    (u) => u.escuelaId === currentUser?.escuelaId && u.role === 'instructor'
  );

  const horasTotalesMes = todosLosRegistros
    .filter((r) => {
      const fecha = new Date(r.fecha);
      const hoy = new Date();
      return fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear();
    })
    .reduce((sum, r) => sum + r.totalHoras, 0);

  const clasesHoy = clases.filter((c) => {
    const fecha = new Date(c.fecha);
    const hoy = new Date();
    return (
      c.escuelaId === currentUser?.escuelaId &&
      fecha.toDateString() === hoy.toDateString()
    );
  });

  const handleAprobar = (id: string) => {
    aprobarRegistroHoras(id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Panel de Supervisor</h2>
        <p className="text-gray-600 mt-1">{escuela?.nombre}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Registros pendientes</p>
              <p className="text-2xl font-bold text-gray-900">{registrosPendientes.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Horas este mes</p>
              <p className="text-2xl font-bold text-gray-900">{horasTotalesMes.toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Instructores</p>
              <p className="text-2xl font-bold text-gray-900">{instructores.length}</p>
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
        <h3 className="text-lg font-semibold mb-4">Registros de Horas Pendientes</h3>
        {registrosPendientes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>No hay registros pendientes de aprobación</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Instructor
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Fecha
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Horario
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Total Horas
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Descripción
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {registrosPendientes
                  .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                  .map((registro) => {
                    const instructor = users.find((u) => u.id === registro.instructorId);
                    return (
                      <tr key={registro.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              {instructor?.nombre} {instructor?.apellido}
                            </p>
                            <p className="text-sm text-gray-500">{instructor?.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {format(new Date(registro.fecha), 'dd MMM yyyy', { locale: es })}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {registro.horaInicio} - {registro.horaFin}
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold text-gray-900">
                            {registro.totalHoras.toFixed(1)}h
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {registro.descripcion || '-'}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleAprobar(registro.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                          >
                            Aprobar
                          </button>
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
        <h3 className="text-lg font-semibold mb-4">Historial de Registros Aprobados</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Instructor
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Fecha</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Horario
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Total Horas
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {todosLosRegistros
                .filter((r) => r.aprobado)
                .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                .slice(0, 10)
                .map((registro) => {
                  const instructor = users.find((u) => u.id === registro.instructorId);
                  return (
                    <tr key={registro.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {instructor?.nombre} {instructor?.apellido}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {format(new Date(registro.fecha), 'dd MMM yyyy', { locale: es })}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {registro.horaInicio} - {registro.horaFin}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-gray-900">
                          {registro.totalHoras.toFixed(1)}h
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3" />
                          Aprobado
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
