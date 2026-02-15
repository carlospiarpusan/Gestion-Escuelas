import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Escuela, RegistroHoras, Pago, ResultadoExamen, Clase, Vehiculo } from '../types';
import { USE_API } from '../config/api';
import { escuelasAPI, usersAPI, registrosAPI, pagosAPI, examenesAPI, vehiculosAPI } from '../services/api';

interface AppState {
  currentUser: User | null;
  escuelas: Escuela[];
  users: User[];
  registrosHoras: RegistroHoras[];
  pagos: Pago[];
  resultadosExamen: ResultadoExamen[];
  clases: Clase[];
  vehiculos: Vehiculo[];

  login: (email: string, password: string) => User | null;
  logout: () => void;
  setCurrentUser: (user: User | null) => void;

  addEscuela: (escuela: Omit<Escuela, 'id' | 'fechaCreacion'>) => Promise<void>;
  updateEscuela: (id: string, escuela: Partial<Escuela>) => Promise<void>;
  deleteEscuela: (id: string) => Promise<void>;

  addUser: (user: Omit<User, 'id' | 'fechaRegistro'>) => Promise<void>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;

  addRegistroHoras: (registro: Omit<RegistroHoras, 'id'>) => Promise<void>;
  updateRegistroHoras: (id: string, registro: Partial<RegistroHoras>) => Promise<void>;
  aprobarRegistroHoras: (id: string) => Promise<void>;

  addPago: (pago: Omit<Pago, 'id' | 'fecha'>) => Promise<void>;
  updatePago: (id: string, pago: Partial<Pago>) => Promise<void>;

  addResultadoExamen: (resultado: Omit<ResultadoExamen, 'id' | 'fecha'>) => Promise<void>;

  addClase: (clase: Omit<Clase, 'id'>) => Promise<void>;
  updateClase: (id: string, clase: Partial<Clase>) => Promise<void>;

  addVehiculo: (vehiculo: Omit<Vehiculo, 'id'>) => Promise<void>;
  updateVehiculo: (id: string, vehiculo: Partial<Vehiculo>) => Promise<void>;
  deleteVehiculo: (id: string) => Promise<void>;

  fetchInitialData: () => Promise<void>;
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
      vehiculos: [],

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

      setCurrentUser: (user) => set({ currentUser: user }),

      addEscuela: async (escuela) => {
        if (USE_API) {
          const res = await escuelasAPI.create(escuela);
          set((state) => ({ escuelas: [...state.escuelas, res.data] }));
        } else {
          const newEscuela: Escuela = {
            ...escuela,
            id: generateId(),
            fechaCreacion: new Date(),
          };
          set((state) => ({ escuelas: [...state.escuelas, newEscuela] }));
        }
      },

      updateEscuela: async (id, escuela) => {
        if (USE_API) {
          const res = await escuelasAPI.update(id, escuela);
          set((state) => ({
            escuelas: state.escuelas.map((e) =>
              e.id === id ? res.data : e
            ),
          }));
        } else {
          set((state) => ({
            escuelas: state.escuelas.map((e) =>
              e.id === id ? { ...e, ...escuela } : e
            ),
          }));
        }
      },

      deleteEscuela: async (id) => {
        if (USE_API) {
          await escuelasAPI.delete(id);
          set((state) => ({
            escuelas: state.escuelas.filter((e) => e.id !== id),
          }));
        } else {
          set((state) => ({
            escuelas: state.escuelas.filter((e) => e.id !== id),
          }));
        }
      },

      addUser: async (user) => {
        if (USE_API) {
          const res = await usersAPI.create(user);
          set((state) => ({ users: [...state.users, res.data] }));
        } else {
          const newUser: User = {
            ...user,
            id: generateId(),
            fechaRegistro: new Date(),
          };
          set((state) => ({ users: [...state.users, newUser] }));
        }
      },

      updateUser: async (id, user) => {
        if (USE_API) {
          const res = await usersAPI.update(id, user);
          set((state) => ({
            users: state.users.map((u) => (u.id === id ? res.data : u)),
          }));
        } else {
          set((state) => ({
            users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u)),
          }));
        }
      },

      deleteUser: async (id) => {
        if (USE_API) {
          await usersAPI.delete(id);
          set((state) => ({
            users: state.users.filter((u) => u.id !== id),
          }));
        } else {
          set((state) => ({
            users: state.users.filter((u) => u.id !== id),
          }));
        }
      },

      addRegistroHoras: async (registro) => {
        if (USE_API) {
          const res = await registrosAPI.create(registro);
          set((state) => ({
            registrosHoras: [...state.registrosHoras, res.data],
          }));
        } else {
          const newRegistro: RegistroHoras = {
            ...registro,
            id: generateId(),
          };
          set((state) => ({
            registrosHoras: [...state.registrosHoras, newRegistro],
          }));
        }
      },

      updateRegistroHoras: async (id, registro) => {
        // API equivalent missing in current guide, falling back to local for now
        set((state) => ({
          registrosHoras: state.registrosHoras.map((r) =>
            r.id === id ? { ...r, ...registro } : r
          ),
        }));
      },

      aprobarRegistroHoras: async (id) => {
        if (USE_API) {
          const res = await registrosAPI.aprobar(id);
          set((state) => ({
            registrosHoras: state.registrosHoras.map((r) =>
              r.id === id ? res.data : r
            ),
          }));
        } else {
          set((state) => ({
            registrosHoras: state.registrosHoras.map((r) =>
              r.id === id ? { ...r, aprobado: true } : r
            ),
          }));
        }
      },

      addPago: async (pago) => {
        if (USE_API) {
          const res = await pagosAPI.create(pago);
          set((state) => ({ pagos: [...state.pagos, res.data] }));
        } else {
          const newPago: Pago = {
            ...pago,
            id: generateId(),
            fecha: new Date(),
          };
          set((state) => ({ pagos: [...state.pagos, newPago] }));
        }
      },

      updatePago: async (id, pago) => {
        if (USE_API) {
          const res = await pagosAPI.update(id, pago);
          set((state) => ({
            pagos: state.pagos.map((p) => (p.id === id ? res.data : p)),
          }));
        } else {
          set((state) => ({
            pagos: state.pagos.map((p) => (p.id === id ? { ...p, ...pago } : p)),
          }));
        }
      },

      addResultadoExamen: async (resultado) => {
        if (USE_API) {
          const res = await examenesAPI.create(resultado);
          set((state) => ({
            resultadosExamen: [...state.resultadosExamen, res.data],
          }));
        } else {
          const newResultado: ResultadoExamen = {
            ...resultado,
            id: generateId(),
            fecha: new Date(),
          };
          set((state) => ({
            resultadosExamen: [...state.resultadosExamen, newResultado],
          }));
        }
      },

      addClase: async (clase) => {
        const newClase: Clase = {
          ...clase,
          id: generateId(),
        };
        set((state) => ({ clases: [...state.clases, newClase] }));
      },

      updateClase: async (id, clase) => {
        set((state) => ({
          clases: state.clases.map((c) => (c.id === id ? { ...c, ...clase } : c)),
        }));
      },

      addVehiculo: async (vehiculo) => {
        if (USE_API) {
          const res = await vehiculosAPI.create(vehiculo);
          set((state) => ({ vehiculos: [...state.vehiculos, res.data] }));
        } else {
          const newVehiculo: Vehiculo = {
            ...vehiculo,
            id: generateId(),
          };
          set((state) => ({ vehiculos: [...state.vehiculos, newVehiculo] }));
        }
      },

      updateVehiculo: async (id, vehiculo) => {
        if (USE_API) {
          const res = await vehiculosAPI.update(id, vehiculo);
          set((state) => ({
            vehiculos: state.vehiculos.map((v) => (v.id === id ? res.data : v)),
          }));
        } else {
          set((state) => ({
            vehiculos: state.vehiculos.map((v) => (v.id === id ? { ...v, ...vehiculo } : v)),
          }));
        }
      },

      deleteVehiculo: async (id) => {
        if (USE_API) {
          await vehiculosAPI.delete(id);
          set((state) => ({
            vehiculos: state.vehiculos.filter((v) => v.id !== id),
          }));
        } else {
          set((state) => ({
            vehiculos: state.vehiculos.filter((v) => v.id !== id),
          }));
        }
      },

      fetchInitialData: async () => {
        if (USE_API) {
          const [escuelas, users, pagos, registros, examenes, vehiculos] = await Promise.all([
            escuelasAPI.getAll(),
            usersAPI.getAll(),
            pagosAPI.getAll(),
            registrosAPI.getAll(),
            examenesAPI.getAll(),
            vehiculosAPI.getAll(),
          ]);
          set({
            escuelas: escuelas.data,
            users: users.data,
            pagos: pagos.data,
            registrosHoras: registros.data,
            resultadosExamen: examenes.data,
            vehiculos: vehiculos.data,
          });
        }
      },
    }),
    {
      name: 'gestion-escuelas-storage',
    }
  )
);
