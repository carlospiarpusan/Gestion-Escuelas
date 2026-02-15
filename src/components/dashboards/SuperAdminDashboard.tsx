import { useState } from 'react';
import { useStore } from '../../store';
import { Building2, Plus, Edit2, Trash2, Search, Users } from 'lucide-react';
import type { Escuela } from '../../types';

export default function SuperAdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [editingEscuela, setEditingEscuela] = useState<Escuela | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    cif: '',
    activo: true,
  });

  const escuelas = useStore((state) => state.escuelas);
  const users = useStore((state) => state.users);
  const addEscuela = useStore((state) => state.addEscuela);
  const updateEscuela = useStore((state) => state.updateEscuela);
  const deleteEscuela = useStore((state) => state.deleteEscuela);

  const filteredEscuelas = escuelas.filter((e) =>
    e.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.cif.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEscuela) {
      updateEscuela(editingEscuela.id, formData);
    } else {
      addEscuela(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      direccion: '',
      telefono: '',
      email: '',
      cif: '',
      activo: true,
    });
    setEditingEscuela(null);
    setShowModal(false);
  };

  const handleEdit = (escuela: Escuela) => {
    setEditingEscuela(escuela);
    setFormData({
      nombre: escuela.nombre,
      direccion: escuela.direccion,
      telefono: escuela.telefono,
      email: escuela.email,
      cif: escuela.cif,
      activo: escuela.activo,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta escuela? Se eliminarán todos los datos asociados.')) {
      deleteEscuela(id);
    }
  };

  const getUserCountByEscuela = (escuelaId: string) => {
    return users.filter((u) => u.escuelaId === escuelaId).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Panel de Super Administrador</h2>
          <p className="text-gray-600 mt-1">Gestión de escuelas de conducción</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nueva Escuela
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Escuelas</p>
              <p className="text-2xl font-bold text-gray-900">{escuelas.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Escuelas Activas</p>
              <p className="text-2xl font-bold text-gray-900">
                {escuelas.filter((e) => e.activo).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Usuarios</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre o CIF..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Escuela</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">CIF</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Contacto</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Usuarios</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEscuelas.map((escuela) => (
                <tr key={escuela.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{escuela.nombre}</p>
                      <p className="text-sm text-gray-500">{escuela.direccion}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{escuela.cif}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <p className="text-gray-900">{escuela.telefono}</p>
                      <p className="text-gray-500">{escuela.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      <Users className="w-4 h-4" />
                      {getUserCountByEscuela(escuela.id)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        escuela.activo
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {escuela.activo ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(escuela)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-blue-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(escuela.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingEscuela ? 'Editar Escuela' : 'Nueva Escuela'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Nombre de la escuela</label>
                <input
                  type="text"
                  className="input"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">CIF</label>
                <input
                  type="text"
                  className="input"
                  value={formData.cif}
                  onChange={(e) => setFormData({ ...formData, cif: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">Dirección</label>
                <input
                  type="text"
                  className="input"
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Teléfono</label>
                  <input
                    type="tel"
                    className="input"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="activo"
                  checked={formData.activo}
                  onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="activo" className="text-sm font-medium text-gray-700">
                  Escuela activa
                </label>
              </div>

              <div className="flex gap-2 justify-end">
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingEscuela ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
