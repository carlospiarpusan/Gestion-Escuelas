import { useState } from 'react';
import { useStore } from '../../store';
import { Clock, Plus, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function InstructorDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fecha: format(new Date(), 'yyyy-MM-dd'),
    horaInicio: '',
    horaFin: '',
    descripcion: '',
  });

  const currentUser = useStore((state) => state.currentUser);
  const registrosHoras = useStore((state) => state.registrosHoras);
  const escuelas = useStore((state) => state.escuelas);
  const clases = useStore((state) => state.clases);
  const addRegistroHoras = useStore((state) => state.addRegistroHoras);

  const escuela = escuelas.find((e) => e.id === currentUser?.escuelaId);
  const misRegistros = registrosHoras.filter((r) => r.instructorId === currentUser?.id);
  const misClases = clases.filter((c) => c.instructorId === currentUser?.id);

  const calcularTotalHoras = (inicio: string, fin: string) => {
    const [horaIni, minIni] = inicio.split(':').map(Number);
    const [horaFin, minFin] = fin.split(':').map(Number);
    const totalMinutos = (horaFin * 60 + minFin) - (horaIni * 60 + minIni);
    return totalMinutos / 60;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalHoras = calcularTotalHoras(formData.horaInicio, formData.horaFin);
    
    if (totalHoras <= 0) {
      alert('La hora de fin debe ser posterior a la hora de inicio');
      return;
    }

    addRegistroHoras({
      instructorId: currentUser!.id,
      escuelaId: currentUser!.escuelaId!,
      fecha: new Date(formData.fecha),
      horaInicio: formData.horaInicio,
      horaFin: formData.horaFin,
      totalHoras,
      descripcion: formData.descripcion,
      aprobado: false,
    });

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      fecha: format(new Date(), 'yyyy-MM-dd'),
      horaInicio: '',
      horaFin: '',
      descripcion: '',
    });
    setShowModal(false);
  };

  const totalHorasMes = misRegistros
    .filter((r) => {
      const fecha = new Date(r.fecha);
      const hoy = new Date();
      return fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear();
    })
    .reduce((sum, r) => sum + r.totalHoras, 0);

  const horasAprobadas = misRegistros
    .filter((r) => r.aprobado)
    .reduce((sum, r) => sum + r.totalHoras, 0);

  const horasPendientes = misRegistros
    .filter((r) => !r.aprobado)
    .reduce((sum, r) => sum + r.totalHoras, 0);

  const clasesHoy = misClases.filter((c) => {
    const fecha = new Date(c.fecha);
    const hoy = new Date();
    return fecha.toDateString() === hoy.toDateString();
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Panel de Instructor</h2>
          <p className="text-gray-600 mt-1">{escuela?.nombre}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Registrar Horas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Horas este mes</p>
              <p className="text-2xl font-bold text-gray-900">{totalHorasMes.toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Horas aprobadas</p>
              <p className="text-2xl font-bold text-gray-900">{horasAprobadas.toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <XCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Horas pendientes</p>
              <p className="text-2xl font-bold text-gray-900">{horasPendientes.toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Clases hoy</p>
              <p className="text-2xl font-bold text-gray-900">{clasesHoy.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Historial de horas</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Fecha</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Horario</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Total Horas</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Descripción</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {misRegistros
                .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                .map((registro) => (
                  <tr key={registro.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
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
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          registro.aprobado
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {registro.aprobado ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            Aprobado
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />
                            Pendiente
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Registrar Horas de Trabajo</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Fecha</label>
                <input
                  type="date"
                  className="input"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Hora inicio</label>
                  <input
                    type="time"
                    className="input"
                    value={formData.horaInicio}
                    onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="label">Hora fin</label>
                  <input
                    type="time"
                    className="input"
                    value={formData.horaFin}
                    onChange={(e) => setFormData({ ...formData, horaFin: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">Descripción</label>
                <textarea
                  className="input"
                  rows={3}
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Describe las actividades realizadas..."
                />
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
