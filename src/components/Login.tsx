import { useState } from 'react';
import { useStore } from '../store';
import { LogIn } from 'lucide-react';
import { authAPI } from '../services/api';
import { USE_API } from '../config/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const loginLocal = useStore((state) => state.login);
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (USE_API) {
      try {
        const response = await authAPI.login(email, password);
        const { token, user } = response.data;
        localStorage.setItem('auth_token', token);
        setCurrentUser(user);
      } catch (error: any) {
        setError(error.response?.data?.error || 'Error al iniciar sesión');
      }
    } else {
      const user = loginLocal(email, password);
      if (!user) {
        setError('Credenciales incorrectas o usuario inactivo');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
      <div className="card w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Sistema de Gestión</h1>
          <p className="text-gray-600 mt-2">Escuelas de Conducción</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Correo electrónico</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@ejemplo.com"
              required
            />
          </div>

          <div>
            <label className="label">Contraseña</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full">
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
          <p className="font-semibold mb-2">Credenciales de prueba:</p>
          <div className="space-y-1">
            <p>Super Admin: superadmin@gestion.com / admin123</p>
            <p>Admin: admin@madrid.com / admin123</p>
            <p>Instructor: instructor@madrid.com / instructor123</p>
            <p>Secretaria: secretaria@madrid.com / secretaria123</p>
            <p>Alumno: alumno@madrid.com / alumno123</p>
            <p>Supervisor: supervisor@madrid.com / supervisor123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
