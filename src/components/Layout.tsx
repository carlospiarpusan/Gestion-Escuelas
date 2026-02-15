import { useStore } from '../store';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const roleNames: Record<UserRole, string> = {
  super_admin: 'Super Administrador',
  admin: 'Administrador',
  instructor: 'Instructor',
  secretaria: 'Secretaria',
  alumno: 'Alumno',
  supervisor: 'Supervisor',
};

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const currentUser = useStore((state) => state.currentUser);
  const logout = useStore((state) => state.logout);

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-xl font-bold text-gray-900">
              Sistema de Gestión - Escuelas de Conducción
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {currentUser.nombre} {currentUser.apellido}
              </p>
              <p className="text-xs text-gray-500">{roleNames[currentUser.role]}</p>
            </div>
            <button
              onClick={logout}
              className="btn btn-secondary flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="pt-16 flex">
        {sidebarOpen && (
          <aside className="w-64 bg-white shadow-md fixed left-0 top-16 bottom-0 overflow-y-auto">
            {children}
          </aside>
        )}
        
        <main className={`flex-1 p-6 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all`}>
          {children}
        </main>
      </div>
    </div>
  );
}
