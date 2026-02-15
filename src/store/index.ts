import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Escuela, RegistroHoras, Pago, ResultadoExamen, Clase } from '../types';

interface AppState {
  currentUser: User | null;
  escuelas: Escuela[];
  users: User[];
  registrosHoras: RegistroHoras[];
  pagos: Pago[];
  resultadosExamen: ResultadoExamen[];
  clases: Clase[];
  
  login: (email: string, password: string) => User | null;
  logout: () => void;
  
  addEscuela: (escuela: Omit<Escuela, 'id' | 'fechaCreacion'>) => void;
  updateEscuela: (id: string, escuela: Partial<Escuela>) => void;
  deleteEscuela: (id: string) => void;
  
  addUser: (user: Omit<User, 'id' | 'fechaRegistro'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  
  addRegistroHoras: (registro: Omit<RegistroHoras, 'id'>) => void;
  updateRegistroHoras: (id: string, registro: Partial<RegistroHoras>) => void;
  aprobarRegistroHoras: (id: string) => void;
  
  addPago: (pago: Omit<Pago, 'id' | 'fecha'>) => void;
  updatePago: (id: string, pago: Partial<Pago>) => void;
  
  addResultadoExamen: (resultado: Omit<ResultadoExamen, 'id' | 'fecha'>) => void;
  
  addClase: (clase: Omit<Clase, 'id'>) => void;
  updateClase: (id: string, clase: Partial<Clase>) => void;
}

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

const initialUsers: User[] = [
  {
    id: '1',
    email: 'superadmin@gestion.com',
    password: 'admin123',
    nombre: 'Super',
    apellido: 'Administrador',
    role: 'super_admin',
    telefono: '600000000',
    fechaRegistro: new Date('2024-01-01'),
    activo: true,
  },
  {
    id: '2',
    email: 'admin@madrid.com',
    password: 'admin123',
    nombre: 'Carlos',
    apellido: 'García',
    role: 'admin',
    escuelaId: 'esc1',
    telefono: '611111111',
    fechaRegistro: new Date('2024-01-15'),
    activo: true,
  },
  {
    id: '3',
    email: 'instructor@madrid.com',
    password: 'instructor123',
    nombre: 'María',
    apellido: 'López',
    role: 'instructor',
    escuelaId: 'esc1',
    telefono: '622222222',
    fechaRegistro: new Date('2024-02-01'),
    activo: true,
  },
  {
    id: '4',
    email: 'secretaria@madrid.com',
    password: 'secretaria123',
    nombre: 'Ana',
    apellido: 'Martínez',
    role: 'secretaria',
    escuelaId: 'esc1',
    telefono: '633333333',
    fechaRegistro: new Date('2024-02-01'),
    activo: true,
  },
  {
    id: '5',
    email: 'alumno@madrid.com',
    password: 'alumno123',
    nombre: 'Juan',
    apellido: 'Rodríguez',
    role: 'alumno',
    escuelaId: 'esc1',
    telefono: '644444444',
    fechaRegistro: new Date('2024-03-01'),
    activo: true,
  },
  {
    id: '6',
    email: 'supervisor@madrid.com',
    password: 'supervisor123',
    nombre: 'Pedro',
    apellido: 'Sánchez',
    role: 'supervisor',
    escuelaId: 'esc1',
    telefono: '655555555',
    fechaRegistro: new Date('2024-02-01'),
    activo: true,
  },
];

const initialEscuelas: Escuela[] = [
  {
    id: 'esc1',
    nombre: 'Autoescuela Madrid Centro',
    direccion: 'Calle Mayor 123, Madrid',
    telefono: '911234567',
    email: 'info@autoescuelamadrid.com',
    cif: 'B12345678',
    fechaCreacion: new Date('2024-01-01'),
    activo: true,
  },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      escuelas: initialEscuelas,
      users: initialUsers,
      registrosHoras: [],
      pagos: [],
      resultadosExamen: [],
      clases: [],

      login: (email, password) => {
        const user = get().users.find(
          (u) => u.email === email && u.password === password && u.activo
        );
        if (user) {
          set({ currentUser: user });
          return user;
        }
        return null;
      },

      logout: () => set({ currentUser: null }),

      addEscuela: (escuela) => {
        const newEscuela: Escuela = {
          ...escuela,
          id: generateId(),
          fechaCreacion: new Date(),
        };
        set((state) => ({ escuelas: [...state.escuelas, newEscuela] }));
      },

      updateEscuela: (id, escuela) => {
        set((state) => ({
          escuelas: state.escuelas.map((e) =>
            e.id === id ? { ...e, ...escuela } : e
          ),
        }));
      },

      deleteEscuela: (id) => {
        set((state) => ({
          escuelas: state.escuelas.filter((e) => e.id !== id),
        }));
      },

      addUser: (user) => {
        const newUser: User = {
          ...user,
          id: generateId(),
          fechaRegistro: new Date(),
        };
        set((state) => ({ users: [...state.users, newUser] }));
      },

      updateUser: (id, user) => {
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u)),
        }));
      },

      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        }));
      },

      addRegistroHoras: (registro) => {
        const newRegistro: RegistroHoras = {
          ...registro,
          id: generateId(),
        };
        set((state) => ({
          registrosHoras: [...state.registrosHoras, newRegistro],
        }));
      },

      updateRegistroHoras: (id, registro) => {
        set((state) => ({
          registrosHoras: state.registrosHoras.map((r) =>
            r.id === id ? { ...r, ...registro } : r
          ),
        }));
      },

      aprobarRegistroHoras: (id) => {
        set((state) => ({
          registrosHoras: state.registrosHoras.map((r) =>
            r.id === id ? { ...r, aprobado: true } : r
          ),
        }));
      },

      addPago: (pago) => {
        const newPago: Pago = {
          ...pago,
          id: generateId(),
          fecha: new Date(),
        };
        set((state) => ({ pagos: [...state.pagos, newPago] }));
      },

      updatePago: (id, pago) => {
        set((state) => ({
          pagos: state.pagos.map((p) => (p.id === id ? { ...p, ...pago } : p)),
        }));
      },

      addResultadoExamen: (resultado) => {
        const newResultado: ResultadoExamen = {
          ...resultado,
          id: generateId(),
          fecha: new Date(),
        };
        set((state) => ({
          resultadosExamen: [...state.resultadosExamen, newResultado],
        }));
      },

      addClase: (clase) => {
        const newClase: Clase = {
          ...clase,
          id: generateId(),
        };
        set((state) => ({ clases: [...state.clases, newClase] }));
      },

      updateClase: (id, clase) => {
        set((state) => ({
          clases: state.clases.map((c) => (c.id === id ? { ...c, ...clase } : c)),
        }));
      },
    }),
    {
      name: 'gestion-escuelas-storage',
    }
  )
);
