export type UserRole = 'super_admin' | 'admin' | 'instructor' | 'secretaria' | 'alumno' | 'supervisor';

export interface User {
  id: string;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  role: UserRole;
  escuelaId?: string;
  telefono?: string;
  direccion?: string;
  fechaRegistro: Date;
  activo: boolean;
}

export interface Escuela {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  cif: string;
  fechaCreacion: Date;
  activo: boolean;
  logo?: string;
}

export interface RegistroHoras {
  id: string;
  instructorId: string;
  escuelaId: string;
  fecha: Date;
  horaInicio: string;
  horaFin: string;
  totalHoras: number;
  descripcion: string;
  aprobado: boolean;
}

export interface Pago {
  id: string;
  alumnoId: string;
  escuelaId: string;
  monto: number;
  concepto: string;
  fecha: Date;
  metodoPago: 'efectivo' | 'tarjeta' | 'transferencia';
  estado: 'pendiente' | 'pagado' | 'cancelado';
  comprobante?: string;
}

export interface PreguntaExamen {
  id: string;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
  imagen?: string;
  categoria: 'señales' | 'normas' | 'seguridad' | 'mecánica';
}

export interface ResultadoExamen {
  id: string;
  alumnoId: string;
  escuelaId: string;
  fecha: Date;
  preguntas: PreguntaExamen[];
  respuestas: number[];
  puntuacion: number;
  aprobado: boolean;
  tiempoTotal: number;
}

export interface Clase {
  id: string;
  alumnoId: string;
  instructorId: string;
  escuelaId: string;
  fecha: Date;
  horaInicio: string;
  horaFin: string;
  tipo: 'teorica' | 'practica';
  estado: 'programada' | 'completada' | 'cancelada';
  notas?: string;
}
