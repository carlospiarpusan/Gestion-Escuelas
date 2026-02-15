import { useState } from 'react';
import { useStore } from '../../store';
import { Plus, Edit2, Trash2, Search, UserCheck, Car, PenTool } from 'lucide-react';
import type { User, UserRole, Vehiculo } from '../../types';

const roleOptions: { value: UserRole; label: string }[] = [
  { value: 'admin', label: 'Administrador' },
  { value: 'instructor', label: 'Instructor' },
  { value: 'secretaria', label: 'Secretaria' },
  { value: 'alumno', label: 'Alumno' },
  { value: 'supervisor', label: 'Supervisor' },
];

export default function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');

  const [activeTab, setActiveTab] = useState<'usuarios' | 'vehiculos'>('usuarios');
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehiculo | null>(null);

  const currentUser = useStore((state) => state.currentUser);
  const users = useStore((state) => state.users);
  const escuelas = useStore((state) => state.escuelas);
  const vehiculos = useStore((state) => state.vehiculos);

  const addUser = useStore((state) => state.addUser);
  const updateUser = useStore((state) => state.updateUser);
  const deleteUser = useStore((state) => state.deleteUser);

  const addVehiculo = useStore((state) => state.addVehiculo);
  const updateVehiculo = useStore((state) => state.updateVehiculo);
  const deleteVehiculo = useStore((state) => state.deleteVehiculo);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    role: 'alumno' as UserRole,
    telefono: '',
    direccion: '',
    activo: true,
  });

  const [vehicleFormData, setVehicleFormData] = useState({
    marca: '',
    modelo: '',
    placa: '',
    tipo: 'coche' as 'coche' | 'moto',
    estado: 'activo' as 'activo' | 'taller' | 'baja',
    imagen: '',
  });

  const escuela = escuelas.find((e) => e.id === currentUser?.escuelaId);
  const escuelaUsers = users.filter((u) => u.escuelaId === currentUser?.escuelaId);
  const escuelaVehiculos = vehiculos.filter((v) => v.escuelaId === currentUser?.escuelaId);

  const filteredVehiculos = escuelaVehiculos.filter((v) => {
    const matchesSearch =
      v.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.placa.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredUsers = escuelaUsers.filter((u) => {
    const matchesSearch =
      u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser.id, formData);
    } else {
      addUser({
        ...formData,
        escuelaId: currentUser?.escuelaId,
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      nombre: '',
      apellido: '',
      role: 'alumno',
      telefono: '',
      direccion: '',
      activo: true,
    });
    setEditingUser(null);
    setShowModal(false);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      password: user.password,
      nombre: user.nombre,
      apellido: user.apellido,
      role: user.role,
      telefono: user.telefono || '',
      direccion: user.direccion || '',
      activo: user.activo,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      deleteUser(id);
    }
  };

  const resetVehicleForm = () => {
    setVehicleFormData({
      marca: '',
      modelo: '',
      placa: '',
      tipo: 'coche',
      estado: 'activo',
      imagen: '',
    });
    setEditingVehicle(null);
    setShowVehicleModal(false);
  };

  const handleVehicleSubmit = (e: React.FormEvent) => {
    console.log('Submitting vehicle:', vehicleFormData);
    e.preventDefault();
    if (editingVehicle) {
      updateVehiculo(editingVehicle.id, vehicleFormData);
    } else {
      addVehiculo({
        ...vehicleFormData,
        escuelaId: currentUser!.escuelaId!,
        activo: true,
      });
    }
    resetVehicleForm();
  };

  const handleEditVehicle = (vehicle: Vehiculo) => {
    setEditingVehicle(vehicle);
    setVehicleFormData({
      marca: vehicle.marca,
      modelo: vehicle.modelo,
      placa: vehicle.placa,
      tipo: vehicle.tipo,
      estado: vehicle.estado,
      imagen: vehicle.imagen || '',
    });
    setShowVehicleModal(true);
  };

  const handleDeleteVehicle = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este vehículo?')) {
      deleteVehiculo(id);
    }
  };

  const getUserCountByRole = (role: UserRole) => {
    return escuelaUsers.filter((u) => u.role === role).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Panel de Administrador</h2>
          <p className="text-gray-600 mt-1">{escuela?.nombre}</p>
        </div>
        <button
          onClick={() => activeTab === 'usuarios' ? setShowModal(true) : setShowVehicleModal(true)}
          className="btn btn-primary flex items-center justify-center gap-2 w-full md:w-auto"
        >
          <Plus className="w-5 h-5" />
          {activeTab === 'usuarios' ? 'Nuevo Usuario' : 'Nuevo Vehículo'}
        </button>
      </div>

      <div className="flex gap-4 border-b border-gray-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('usuarios')}
          className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'usuarios'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-gray-900'
            }`}
        >
          Usuarios
        </button>
        <button
          onClick={() => setActiveTab('vehiculos')}
          className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'vehiculos'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-gray-900'
            }`}
        >
          Vehículos
        </button>
      </div>

      {
        activeTab === 'usuarios' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {roleOptions.map((role) => (
              <div key={role.value} className="card">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">{role.label}s</p>
                    <p className="text-xl font-bold text-gray-900">
                      {getUserCountByRole(role.value)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card">
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por marca, modelo o placa..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVehiculos.map((vehiculo) => (
                <div key={vehiculo.id} className="border rounded-lg p-4 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    {vehiculo.imagen ? (
                      <img
                        src={vehiculo.imagen}
                        alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Car className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${vehiculo.estado === 'activo'
                      ? 'bg-green-100 text-green-700'
                      : vehiculo.estado === 'taller'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                      }`}>
                      {vehiculo.estado.toUpperCase()}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">{vehiculo.marca} {vehiculo.modelo}</h3>
                    <p className="text-sm text-gray-600 font-mono mt-1">{vehiculo.placa}</p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t">
                    <span className="text-sm text-gray-500 capitalize flex items-center gap-1">
                      {vehiculo.tipo === 'coche' ? <Car className="w-4 h-4" /> : <PenTool className="w-4 h-4" />}
                      {vehiculo.tipo}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditVehicle(vehiculo)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-blue-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteVehicle(vehiculo.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }

      {
        activeTab === 'usuarios' && (
          <div className="card">
            <div className="mb-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, apellido o email..."
                  className="input pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="input w-full md:w-48"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as UserRole | 'all')}
              >
                <option value="all">Todos los roles</option>
                {roleOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Usuario</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Rol</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Teléfono</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.nombre} {user.apellido}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(user.fechaRegistro).toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {roleOptions.find((r) => r.value === user.role)?.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{user.telefono || '-'}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${user.activo
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                            }`}
                        >
                          {user.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-blue-600"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
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
        )}

      {
        showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">
                {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Nombre</label>
                    <input
                      type="text"
                      className="input"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Apellido</label>
                    <input
                      type="text"
                      className="input"
                      value={formData.apellido}
                      onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                      required
                    />
                  </div>
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

                <div>
                  <label className="label">Contraseña</label>
                  <input
                    type="password"
                    className="input"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!editingUser}
                    placeholder={editingUser ? 'Dejar en blanco para mantener' : ''}
                  />
                </div>

                <div>
                  <label className="label">Rol</label>
                  <select
                    className="input"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                    required
                  >
                    {roleOptions.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Teléfono</label>
                    <input
                      type="tel"
                      className="input"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="label">Dirección</label>
                    <input
                      type="text"
                      className="input"
                      value={formData.direccion}
                      onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
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
                    Usuario activo
                  </label>
                </div>

                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={resetForm} className="btn btn-secondary">
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingUser ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

      {
        showVehicleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="card max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">
                {editingVehicle ? 'Editar Vehículo' : 'Nuevo Vehículo'}
              </h3>
              <form onSubmit={handleVehicleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Marca</label>
                    <input
                      type="text"
                      className="input"
                      value={vehicleFormData.marca}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, marca: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Modelo</label>
                    <input
                      type="text"
                      className="input"
                      value={vehicleFormData.modelo}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, modelo: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Placa</label>
                  <input
                    type="text"
                    className="input"
                    value={vehicleFormData.placa}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, placa: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Tipo</label>
                    <select
                      className="input"
                      value={vehicleFormData.tipo}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, tipo: e.target.value as 'coche' | 'moto' })}
                    >
                      <option value="coche">Coche</option>
                      <option value="moto">Moto</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Estado</label>
                    <select
                      className="input"
                      value={vehicleFormData.estado}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, estado: e.target.value as 'activo' | 'taller' | 'baja' })}
                    >
                      <option value="activo">Activo</option>
                      <option value="taller">En Taller</option>
                      <option value="baja">De Baja</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">URL Imagen (Opcional)</label>
                  <input
                    type="url"
                    className="input"
                    value={vehicleFormData.imagen}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, imagen: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={resetVehicleForm} className="btn btn-secondary">
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingVehicle ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </div >
  );
}
